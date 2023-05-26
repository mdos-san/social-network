import cookieParser from "cookie-parser";
import { Server} from "http";
import express from "express";
import { ApiProvider } from "core";

let server = {} as Server;

const ExpressApiProvider: ApiProvider = {
  setup: async (features) => {
    const app = express()
    const port = 3000
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

      const { success, sessionId } = await features.createSession(login, password);

      if (success) {
        res.statusCode = 200;
        res.cookie('session', sessionId, { maxAge: 900000, httpOnly: true });
      } else {
        res.statusCode = 400;
      }

      res.end();
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

