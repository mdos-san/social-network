const { Database } = require("database");

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Crypto
const { randomBytes } = require('crypto');

function randomString(length) {
    return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

// express
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
app.use(cookieParser());

app.get('/', (_, res) => {
    res.send('Hello World!')
})

app.post('/setup', async (_, res) => {
    const userRepositories = Database.getRepositories().userRepository;
    const adminUser = await userRepositories.findUserByLogin("admin");
    if (adminUser) {
        res.statusCode = 400;
        res.end();
        return;
    }

    const hashPassword = await bcrypt.hash("admin", saltRounds);

    await userRepositories.createUser({
        login: "admin",
        password: hashPassword,
    })

    res.statusCode = 200;
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
        login: user.login,
        session: sessionCookie,
    })

    res.statusCode = 200;
    res.end();
})

let server;

module.exports = {
    startServer: async () => {
        console.log("[Database]: init...")
        await Database.init();
        console.log("[Database]: OK")

        server = app.listen(port, () => {
            console.log(`Authentification module is running on port ${port}`)
        })
    },
    closeServer: async () => {
      await Database.close();
      await server.close();
    },
}
