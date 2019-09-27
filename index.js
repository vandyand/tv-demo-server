const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3001


const MongoDb = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://vandyand:u2LAPxFaYkzysmso@cluster0-thvmu.mongodb.net/tvdemodb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
    console.log('get called!')
    client.connect(err => {
        if (err) res.send(err)
        client.db('tvdemodb').collection('tvdemocol')
            .find().toArray().then(r => res.send(r));
    })
    client.close()
})

app.post('/', (req, res) => {
    console.log('post request!!!', req.body)
    client.connect(err => {
        if (err) { res.send(err) }
        client.db("tvdemodb")
            .collection("tvdemocol")
            .insertOne(req.body)
            .then(r => res.send(r.ops))
            .catch(err => console.log(err))
    })
    client.close()
})

app.put('/', (req, res) => {
    console.log('put request!!!', req.body)
    let id = MongoDb.ObjectId(req.body._id)
    delete req.body._id
    client.connect(err => {
        if (err) { res.send(err) }
        client.db("tvdemodb")
            .collection("tvdemocol")
            .findOneAndReplace({ _id: id }, req.body)
            .then(r => res.send(r))
            .catch(err => console.log(err))
    })
    client.close()

})

app.delete('/', (req, res) => {
    console.log('delete func here!', req.body)
    client.connect(err => {
        if (err) res.send(err)
        client.db('tvdemodb').collection('tvdemocol')
            .deleteOne({ _id: MongoDb.ObjectId(req.body._id) }).then(r => res.send(r))
    })
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))





