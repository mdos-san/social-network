const { MongoClient } = require('mongodb');

let client;

const mongoInterface = {
    init: async () => {
        client = new MongoClient("mongodb://localhost:27017");
        await client.connect();
    },
    insertTestDocument: (doc) => {
        const myDB = client.db("test");
        const myColl = myDB.collection("test");
        return myColl.insertOne(doc);
    },
    getTestDocument: () => {
        const myDB = client.db("test");
        const myColl = myDB.collection("test");
        return myColl.findOne();
    },
    removeTestDocument: (query) => {
        const myDB = client.db("test");
        const myColl = myDB.collection("test");
        return myColl.deleteOne(query);
    },
    close: async () => {
        client.close();
    }
}

module.exports = mongoInterface
