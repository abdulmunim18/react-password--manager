const express = require('express')
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'passop';
const port = 3000

const app = express()
app.use(cors());

app.use(bodyParser.json());
client.connect()

app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)

})

app.post('/', async(req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.insertOne(password);
    res.send(req.body)

})
// Delete a password
app.delete('/', async(req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.deleteOne(password);
    res.send(req.body)

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
