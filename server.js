const express = require("express")
const app = express()
const PORT = 40000;


app.listen(PORT, () => {
    console.log("It's Alive! On Port:", PORT )
})