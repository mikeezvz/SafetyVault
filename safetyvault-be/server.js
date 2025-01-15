const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
<<<<<<< HEAD
const session = require('express-session');
const path = require('path');
=======
>>>>>>> efce576cbac74a95820933ffd058771613c31a6e

// Middleware
app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: 'password123',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            collectionName: 'sessions',
        }),
        cookie: { maxAge: 1000 * 60 * 60 },
    })
);

// MongoDB connection
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas', error);
        process.exit(1);
    });


// Route for authentification of user
const userRoute = require('./routes/auth');
app.use('/user', userRoute);

<<<<<<< HEAD
const entryRoute = require('./routes/entry');
app.use('/entry', entryRoute)

const authRoute = require('./routes/auth');
app.use('/auth', authRoute)

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
=======
app.get('/', (req, res) => {
    res.send('Homepage');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
>>>>>>> efce576cbac74a95820933ffd058771613c31a6e
