import { Database } from "database";
import cookieParser from 'cookie-parser';
import express from 'express';
import { Server } from "http";
import createDefaultAdminFeature from "./CreateDefaultAdminFeatureImpl";
import createSessionFeature from "./CreateSessionFeatureImpl";

const app = express()
const port = 3000
app.use(express.json())
app.use(cookieParser());

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.post('/setup', async (_, res) => {
  const result = await createDefaultAdminFeature(Database);

  if (result.success) {
    res.statusCode = 200;
  } else {
    res.statusCode = 400;
  }

  res.end();
})

app.post('/session', async (req, res) => {
  const { login, password } = req.body;

  const { success, sessionId } = await createSessionFeature(Database, login, password);

  if (success) {
    res.statusCode = 200;
    res.cookie('session', sessionId, { maxAge: 900000, httpOnly: true });
  } else {
    res.statusCode = 400;
  }

  res.end();
})

let server = {} as Server;

export async function startServer() {
  console.log("[Database]: init...")
  await Database.init();
  console.log("[Database]: OK")

  server = app.listen(port, () => {
    console.log(`Authentification module is running on port ${port}`)
  })
}

export async function closeServer() {
  await Database.close();
  server.close();
}

export * from "./CreateSessionFeature";
export * from "./CreateDefaultAdminFeature";
export * from "./DatabaseProvider";
export * from "./UserRepository";
export * from "./SessionRepository";
