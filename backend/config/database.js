const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true
        })

        console.log("MongoDB database connection established successfully")

    } catch (err) {
        console.error(err)
        process.exit(1)
    }

};

module.exports = connectDB