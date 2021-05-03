const port = 8085

const express = require('express')

const cors = require('cors')

const app = express()

const route = require('./routes/routes')

app.use(cors())

app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use('/api', route)

app.listen(port, () => {
    console.log('Listening on port', port)
})