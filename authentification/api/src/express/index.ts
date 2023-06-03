import cookieParser from "cookie-parser";
import { Server } from "http";
import express from "express";
import { ApiProvider } from "core";

let server = {} as Server;

const ExpressApiProvider: ApiProvider = {
  setup: async (features) => {
    const app = express();
    const port = process.env.API_PORT || 3000;
    app.use(express.json())
    app.use(cookieParser());

    app.get('/', (_, res) => {
      res.send('Hello World!')
    })

    app.post('/setup', async (_, res) => {
      const result = await features.createDefaultAdmin();

      if (result.success) {
        res.statusCode = 200;
      } else {
        res.statusCode = 400;
      }

      res.end();
    })

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

    server = app.listen(port, () => {
      console.log(`Authentification module is running on port ${port}`)
    })
  },
  clean: async () => {
    server.close();
  },
}

export default ExpressApiProvider;

