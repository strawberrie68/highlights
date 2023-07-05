const mongoose = require("mongoose");


const connectDB = async () => {
    const uri = process.env.ATLAS_URI;
    mongoose.connect(uri, { useNewUrlParser: true })

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("mongoDB database connection established successfully")
    })

};

module.exports = connectDB