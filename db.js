const mongoose = require('mongoose');
// require('dotenv').config(); // Load .env variables

async function connectToMongo() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    
    console.log(`Connecting to MongoDB`);
    await mongoose.connect(mongoUrl);
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}

module.exports = connectToMongo;
