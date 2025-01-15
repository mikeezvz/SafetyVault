const express = require('express');
const cors = require ('cors')
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

const mongoURL = process.env.MONGO_URL

const connectDB = async () => {
    try {
      await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connection to MongoDB successful');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      process.exit(1);
    }
  };

  connectDB();

const entryRoute = require('./routes/entry');
app.use('/entry', entryRoute)

const authRoute = require('./routes/auth');
app.use('/auth', authRoute)

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});