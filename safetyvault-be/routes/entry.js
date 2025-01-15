const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const entrySchema = new mongoose.Schema({
    service: { type: String, required: true },
    username: { type: String },
    password: { type: String},
  });

  const Entry = mongoose.model('entries', entrySchema);

router.get('/all', async (request, response) => {
    try {
        const entries = await Entry.find({ user: req.session.userid });
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const doc = new Entry({
            service: service,
            username: username,
            password: hashedPassword,
            user: req.session.userid
          });
        const savedEntry = await doc.save();
        response.status(201).json(savedEntry)
        console.log('Document saved')
    } catch (error) {
        response.status(500).send('Entry can not be saved')
        console.error('Error saving Entry:', error)
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
      const {id} = req.params; 
      const deletedEntry = await Entry.findByIdAndDelete(id); 
  
      if (!deletedEntry) {
        return res.status(404).json({ message: 'Entry not found' });
      }
  
      res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting entry:', error});
    }
  });

module.exports = router;