const mongoose = require('mongoose');
// const dotenv = require('dotenv');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY");
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;