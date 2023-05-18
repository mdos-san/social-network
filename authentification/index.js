// mongodb
const { insertDocument, init, close, findOne } = require("./mongodb");

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
    await init();

    const adminUser = await findOne('users', { login: "admin" });
    if (adminUser) {
        res.statusCode = 400;
        res.end();
        await close();
        return;
    }

    const hashPassword = await bcrypt.hash("admin", saltRounds);

    await insertDocument("users", {
        login: "admin",
        password: hashPassword,
    })

    res.statusCode = 200;
    res.end();

    await close();
})

app.post('/session', async (req, res) => {
    await init();

    const { login, password } = req.body;
    const user = await findOne('users', { login });
    if (!user) {
        res.statusCode = 400;
        res.end();
        await close();
        return;
    }

    const isCorrect = await bcrypt.compare(password, user.password)
    if (!isCorrect) {
        res.statusCode = 400;
        res.end();
        await close();
        return;
    }

    // Cookie session
    let sessionCookie = randomString(256);
    res.cookie('session', sessionCookie, { maxAge: 900000, httpOnly: true });

    await insertDocument("sessions", {
        login: user.login,
        session: sessionCookie,
    })

    res.statusCode = 200;
    res.end();
    await close();
})

let server;

module.exports = {
    startServer: () => {
        server = app.listen(port, () => {
            console.log(`Authentification module is running on port ${port}`)
        })
    },
    closeServer: () => server.close(),
}
