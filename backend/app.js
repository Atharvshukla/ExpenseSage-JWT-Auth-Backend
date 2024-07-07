const express = require('express')
const cors = require('cors');
const { connectDB } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

//routes
app.use("/api/v1/users", require("./routes/auth"));
app.use("/api/v1/transictions", require("./routes/transiction"));

const server = () => {
    connectDB()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()