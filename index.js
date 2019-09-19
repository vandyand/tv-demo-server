const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3001

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world from get!')
    console.log('got something!')
})

app.post('/', (req, res) => {

})

app.put('/', (req, res) => {

})

app.delete('/', (req, res) => {

})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
