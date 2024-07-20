const mongoose = require("mongoose");

// verrify connectio to the db
mongoose.connect("mongodb://localhost:27017/Login-tut", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected Successfully");
    })
    .catch((err) => {
        console.error("Database cannot be connected", err);
    });

// create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a collection
const collection = mongoose.model("users", LoginSchema);

module.exports = collection;
