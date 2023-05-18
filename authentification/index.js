// mongodb
const { insertDocument, init, close, findOne } = require("./mongodb");

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// express
const express = require('express')
const app = express()
const port = 3000

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

let server;

module.exports = {
    startServer: () => {
        server = app.listen(port, () => {
            console.log(`Authentification module is running on port ${port}`)
        })
    },
    closeServer: () => server.close(),
}
