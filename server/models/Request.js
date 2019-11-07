const mongoose = require('mongoose');
const requestsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true
    },
    priority: {
        type: String,
        require: true
    },
    patientId: {
        type: String,
        require: true
    },
    area: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Requsts', requestsSchema);
