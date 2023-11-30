const express = require('express');
const mongoose = require('mongoose');
const app = express();

const uri = "mongodb+srv://jashandeep0674be21:jFDs23HY3QFOh0mf@cluster0.ux85qkr.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri)
.then(() => {console.log("db connected")})
.catch((err) => {console.log(err)});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
  });
  
  // Create a user model
  const User = mongoose.model('User', userSchema);
  
  app.use(express.json());
  
  // CRUD operations
  
  // Create a new user
  app.post('/users', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a single user by ID
  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a user by ID
  app.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete a user by ID
  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.get('/', (req,res) => {
    res.send("Api working is fine");
});

app.listen(3000, () => {
    console.log("app is working on port 3000");
})