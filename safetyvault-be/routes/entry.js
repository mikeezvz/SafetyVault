const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const entrySchema = new mongoose.Schema({
    service: { type: String, required: true },
    username: { type: String },
    password: { type: String},
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});

const Entry = mongoose.model('entries', entrySchema);

router.use((req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
});

  
router.get('/all', async (request, response) => {
    try {
        const entries = await Entry.find({ user: request.session.user.id });
        response.json(entries);
        console.log('Data received')
    } catch (error) {
        response.status(500).send('Entries can not be loaded from DB')
        console.error('Data can not be received:', error)
    }
});

router.post('/new', async (request, response) => {
    try {
        const { service, username, password } = request.body;
        if (!service || !username || !password) {
            return response.status(400).json({ message: 'All fields are required' });
        }
        const doc = new Entry({
            service: service,
            username: username,
            password: password,
            user: request.session.user.id
          });
        const savedEntry = await doc.save();
        response.status(201).json(savedEntry)
        console.log('Document saved')
    } catch (error) {
        response.status(500).send('Entry can not be saved')
        console.error('Error saving Entry:', error)
    }
});

router.delete('/delete/:id', async (request, response) => {
    try {
      const {id} = request.params; 
      const deletedEntry = await Entry.findByIdAndDelete(id); 
  
      if (!deletedEntry) {
        return response.status(404).json({ message: 'Entry not found' });
      }
  
      response.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
      response.status(500).json({ message: 'Error deleting entry:', error});
    }
  });

module.exports = router;