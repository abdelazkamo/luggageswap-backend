const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

mongoose.connect('mongodb+srv://admin:bdr76CkDOOVHPq5D@luggageswapapi.psvof1m.mongodb.net/luggageswapAPI?retryWrites=true&w=majority')
  .then(() => 
    // Start the server
    app.listen(5000, () => console.log(`Server running on port 5000`)),
    console.log('MongoDB connected'))
  .catch(err => console.error(err));



// Routes
app.use('/luggageswap', require('./routes/auth'));

