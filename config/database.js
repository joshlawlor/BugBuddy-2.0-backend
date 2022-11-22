const mongoose = require('mongoose')
const PORT = 4000;
const db_url = "mongodb://127.0.0.1/BugBuddy2"

mongoose.connect( process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error!"))


db.once('connected' , () => {

    console.log(`Connected to mongoDB ${db.name} at ${db.host}: ${db.port}`)
})