const express = require("express")
const app = express()
const cors = require('cors')

const PORT = 4000;

require('./config/database')
app.use(cors({origin: '*', methods: "GET, POST, PUT, DELETE, PATCH", credentials: true}))

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Need auth for token later on



app.listen(PORT, () => {
    console.log("It's Alive! On Port:", PORT )
})