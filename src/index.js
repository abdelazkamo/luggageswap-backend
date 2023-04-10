const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { mongoURI } = require('../config');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

mongoose.connect(mongoURI)
  .then(() => 
    // Start the server
    app.listen(5000, () => console.log(`Server running on port 5000`)),
    console.log('MongoDB connected'))
  .catch(err => console.error(err));



// Routes
app.use('/luggageswap', require('./routes/user'));
 
