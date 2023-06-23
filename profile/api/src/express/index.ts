import cookieParser from "cookie-parser";
import express from "express";
import { ApiProvider, Features } from "core";
import { Server } from "http";

let server = {} as Server;

const setupCreateProfileApi = (app: express.Express, features: Features) => {
    app.post('/profile', async (req, res) => {
      const { session } = req.cookies;

      try {
        const result = await features.createProfile(session);
        res.statusCode = 200;
        res.json({ profileId: result.profileId });
      } catch (e) {
        res.statusCode = 400;
        console.error(e);
      } finally {
        res.end();
      }
    })
}

const setupGetProfileApi = (app: express.Express, features: Features) => {
    app.get('/profile', async (req, res) => {
      const { session } = req.cookies;

      try {
        const result = await features.getProfile(session);
        res.statusCode = 200;
        res.json({ profile: result.profile });
      } catch (e) {
        res.statusCode = 400;
        // TODO: status message
        console.error(e);
      } finally {
        res.end();
      }
    })
}

const setupChangeProfileApi = (app: express.Express, features: Features) => {
    app.put('/profile', async (req, res) => {
      const { session } = req.cookies as { session: string };
      const { displayName, description } = req.body;

      try {
        const result = await features.changeProfile({
          sessionId: session,
          displayName,
          description,
        });
        res.statusCode = 200;
        res.json({ profile: result.profile });
      } catch (e: any) {
        res.statusCode = 400;
        // TODO: status message
        console.error(e);
      } finally {
        res.end();
      }
    })
}


const ExpressApiProvider: ApiProvider = {
  init: async (features) => {
    const app = express()
    const port = process.env.PROFILE_API_PORT || 3001;
    app.use(express.json())
    app.use(cookieParser());

    setupGetProfileApi(app, features);
    setupChangeProfileApi(app, features);
    setupCreateProfileApi(app, features);

    server = app.listen(port, () => {
      console.log(`Profile module is running on port ${port}`)
    })
  },
  clean: async () => {
    server.close();
  },
}

export default ExpressApiProvider;

