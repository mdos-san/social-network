import { Database } from "database";
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import express from 'express';
import { Server } from "http";
import createDefaultAdminFeature from "./CreateDefaultAdminFeatureImpl";

const saltRounds = 10;

function randomString(length: number) {
  return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

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

  const userRepository = Database.getRepositories().userRepository;
  const user = await userRepository.findUserByLogin(login);
  if (!user) {
    res.statusCode = 400;
    res.end();
    return;
  }

  const isCorrect = await bcrypt.compare(password, user.password)
  if (!isCorrect) {
    res.statusCode = 400;
    res.end();
    return;
  }

  const sessionRepository = Database.getRepositories().sessionRepository;

  // Cookie session
  let sessionCookie = randomString(256);
  res.cookie('session', sessionCookie, { maxAge: 900000, httpOnly: true });

  await sessionRepository.createSession({
    userId: user.id,
    sessionId: sessionCookie,
  })

  res.statusCode = 200;
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
