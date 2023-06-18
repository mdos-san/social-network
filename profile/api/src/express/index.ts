import cookieParser from "cookie-parser";
import express from "express";
import { ApiProvider } from "core";
import { Server } from "http";

let server = {} as Server;

const ExpressApiProvider: ApiProvider = {
  init: async (features) => {
    const app = express()
    const port = process.env.PROFILE_API_PORT || 3001;
    app.use(express.json())
    app.use(cookieParser());

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

    server = app.listen(port, () => {
      console.log(`Profile module is running on port ${port}`)
    })
  },
  clean: async () => {
    server.close();
  },
}

export default ExpressApiProvider;

