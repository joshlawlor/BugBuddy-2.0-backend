const express = require("express")
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 4000;

require('dotenv').config();
require('./config/database')
app.use(cors({origin: '*', methods: "GET, POST, PUT, DELETE, PATCH", credentials: true}))

//ROUTES
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(require('./config/authorization'))
// Need auth for token later on


//API ROUTES
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/posts', commentRoutes)


app.listen(PORT, () => {
    console.log("It's Alive! On Port:", PORT )
})