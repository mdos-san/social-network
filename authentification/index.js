const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

let server;

module.exports = {
    startServer: () => {
        server = app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    },
    closeServer: () => server.close(),
}
