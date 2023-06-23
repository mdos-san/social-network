import cookieParser from "cookie-parser";
import { Server } from "http";
import express from "express";
import { ApiProvider, Features } from "core";

let server = {} as Server;

const setupCreateDefaultAdmin = (app: express.Express, features: Features) => {
  app.post('/setup', async (_, res) => {
    const result = await features.createDefaultAdmin();

    if (result.success) {
      res.statusCode = 200;
    } else {
      res.statusCode = 400;
    }

    res.end();
  })
}

const setupCreateSession = (app: express.Express, features: Features) => {
  app.post('/session', async (req, res) => {
    const { login, password } = req.body;

    try {
      const { sessionId } = await features.createSession(login, password);
      res.statusCode = 200;
      res.cookie('session', sessionId, { maxAge: 900000, httpOnly: true });
    } catch (e) {
      console.error(e);
      res.statusCode = 400;
    } finally {
      res.end()
    }
  })
}

const setupDeleteSession = (app: express.Express, features: Features) => {
  app.delete('/session', async (req, res) => {
    const { session } = req.cookies;

    const { success } = await features.deleteSession(session);

    if (success) {
      res.statusCode = 200;
      res.clearCookie('session');
    } else {
      res.statusCode = 400;
    }

    res.end();
  })
}

const setupCreateUserWithAdmin = (app: express.Express, features: Features) => {
  app.post('/user', async (req, res) => {
    const { login, password } = req.body;
    const { session } = req.cookies;

    try {
      await features.adminCreateUser(session, login, password);
      res.statusCode = 200;
    } catch (e) {
      res.statusCode = 400;
    } finally {
      res.end();
    }
  })
}

const setupChangePassword = (app: express.Express, features: Features) => {
  app.put('/password/:userId', async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;
    const { session } = req.cookies;

    try {
      await features.changePassword(session, userId, password);
      res.statusCode = 200;
    } catch (e) {
      console.error(e);
      res.statusCode = 400;
    } finally {
      res.end();
    }
  })
}

const setupGetUserInfo = (app: express.Express, features: Features) => {
  app.get('/userinfo', async (req, res) => {
    const { session } = req.cookies;

    try {
      const { userinfo } = await features.getUserInfo(session);
      res.statusCode = 200;
      res.send(userinfo);
    } catch (e) {
      console.error(e);
      res.statusCode = 400;
    } finally {
      res.end();
    }
  })
}

const ExpressApiProvider: ApiProvider = {
  setup: async (features) => {
    const app = express();
    const port = process.env.AUTHENTIFICATION_API_PORT || 3000;
    app.use(express.json())
    app.use(cookieParser());

    app.get('/', (_, res) => {
      res.send('Hello World!')
    })

    setupCreateDefaultAdmin(app, features);
    setupCreateSession(app, features);
    setupDeleteSession(app, features);
    setupCreateUserWithAdmin(app, features);
    setupChangePassword(app, features);
    setupGetUserInfo(app, features);

    server = app.listen(port, () => {
      console.log(`Authentification module is running on port ${port}`)
    })
  },
  clean: async () => {
    server.close();
  },
}

export default ExpressApiProvider;

