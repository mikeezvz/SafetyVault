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
        response.json(tasks);
        console.log('Data received')
    } catch (error) {
        response.status(500).send('Tasks can not be loaded from DB')
        console.error('Data can not be received:', error)
    }
});

module.exports = router;