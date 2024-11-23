const express = require('express')
const cors = require("cors")
require("dotenv").config();
const connectToMongo = require('./db');

const app = express()

app.use(cors())
app.use(express.json())

connectToMongo();


// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


app.listen(process.env.PORT || 5000, () => {
  console.log(`iNotes server listening on port ${process.env.PORT || 5000}`)
})
