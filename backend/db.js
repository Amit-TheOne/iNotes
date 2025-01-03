const mongoose = require("mongoose");

const connectToMongo = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to Mongo Successfully");
    })
    .catch((err) => {
        console.error("Failed to connect to Mongo", err);
    });
}

module.exports = connectToMongo;