require('dotenv').config(); // to access .env file
const connectToMongo = require('./db'); // databse call
const express = require('express'); // to create api
const app = express(); 
const port = 5000; 
const cors = require('cors'); // connect to frontend and backend - cross origin resource sharing

// Connect to MongoDB
connectToMongo();

// Configure CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://docify-saquib.vercel.app'
  ],
  credentials: true, 
}));

// Middleware to parse JSON requests
app.use(express.json());

// get - access, post - create, put - edit , delete
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

// API routes
// Authentication
app.use('/api/auth', require('./routes/auth'));

// Notes
// app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
