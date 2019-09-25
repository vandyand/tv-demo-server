const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3001


//
//
//
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://vandyand:u2LAPxFaYkzysmso@cluster0-thvmu.mongodb.net/tvdemodb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     client.db("tvdemodb").collection("tvdemocol").insertOne({ test: "test", test2: "test2", test3: "abcd" }).then(r => console.log(r.ops))
//     //   const collection = client.db("tvdemodb").collection("tvdemocol");
//     // perform actions on the collection object
// });
// client.close();
//
//
//



// var MongoClient = require('mongodb').MongoClient;

// var uri = "mongodb+srv://vandyand:u2LAPxFaYkzysmso@cluster0-thvmu.mongodb.net/test?retryWrites=true&w=majority";
// MongoClient.connect(uri, function (err, db) {
//     console.log('are we connected? yes!')
//     console.log(typeof(db))
//     db.close();
// });



// const MongoClient = require('mongodb').MongoClient
// const dbUri = 'mongodb+srv://vandyand:u2LAPxFaYkzysmso@cluster0-thvmu.mongodb.net/test?retryWrites=true&w=majority'
// const instance = new MongoClient(dbUri, {useNewUrlParser:true, useUnifiedTopology:true})


app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
    client.connect(err => {
        if (err) res.send(err)
        client.db('tvdemodb').collection('tvdemocol')
            .find().toArray().then(r => res.send(r));
    })
    client.close()
})

app.post('/', (req, res) => {
    console.log('post request!!!')
    console.log(req.body)
    client.connect(err => {
        if (err) { res.send(err) }
        client.db("tvdemodb")
            .collection("tvdemocol")
            .insertOne(req.body)
            .then(r => res.send(r.ops))
    })
    client.close()
})

app.put('/', (req, res) => {

})

app.delete('/', (req, res) => {

})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
