const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
// routes
const usersRoutes = require('./routes/users');
const requestsRoutes = require('./routes/requests');

dotenv.config();

// connect to DB
mongoose.connect('mongodb://localhost/EasyWayApp', {useNewUrlParser: true, useFindAndModify: false }, () => console.log('connected to DB'));

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/requests', requestsRoutes);

app.listen(5000, () => {
    console.log('server is running')
});