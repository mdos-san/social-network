const { MongoClient } = require('mongodb');

let client;
const DB = "authentification";

const mongoInterface = {
    init: () => {
        client = new MongoClient("mongodb://localhost:27017");
        return client.connect();
    },
    insertDocument: (collection, doc) => {
        const myDB = client.db(DB);
        const myColl = myDB.collection(collection);
        return myColl.insertOne(doc);
    },
    findOne: (collection, query) => {
        const myDB = client.db(DB);
        const myColl = myDB.collection(collection);
        return myColl.findOne(query);
    },
    deleteOne: (collection, query) => {
        const myDB = client.db(DB);
        const myColl = myDB.collection(collection);
        return myColl.deleteOne(query);
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
    close: () => {
        return client.close();
    }
}

module.exports = mongoInterface
