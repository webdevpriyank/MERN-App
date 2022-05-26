const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // const conn = await mongoose.connect("mongodb+srv://webdevpriyank:webdevpriyank@priyankcluster.zwfzgdb.mongodb.net/mernapp?retryWrites=true&w=majority")
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold)

    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB