const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secretKey } = require('../../config');


// Register a user
router.post('/register', async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    // Check if user with email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with email already exists' });
    }

    // Create a new user
    user = new User({ name, email, contact, password });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();


     // Generate JWT token
     const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        secretKey,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
  // Login a user
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        secretKey,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ payload, token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });
//Get
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

//Get by id
router.get("/users/:id", async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})
router.put("/users/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Hash the password
        if(data.password){
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }
       
        const user = await User.findByIdAndUpdate(id, data);
        if (!user) {
            return res.status(400).json({ message: "Cannot find the user" });
        }
        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

router.delete("/users/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(400).json({ message: "Cannot find the user" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = router;
