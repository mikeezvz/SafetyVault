const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    service: { type: String, required: true },
    username: { type: String },
    password: { type: String},
  });

  const Entry = mongoose.model('entries', entrySchema);

router.get('/all', async (request, response) => {
    try {
        const entries = await Entry.find();
        response.json(entries);
        console.log('Data received')
    } catch (error) {
        response.status(500).send('Tasks can not be loaded from DB')
        console.error('Data can not be received:', error)
    }
});

router.post('/new', async (request, response) => {
    try {
        const doc = new Entry({
            service: request.body.service,
            description: request.body.description,
            completed: false
          });
        const savedTask = await doc.save();
        response.status(201).json(savedTask)
        console.log('Document saved')
    } catch (error) {
    
    }
});

module.exports = router;