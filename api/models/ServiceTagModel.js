const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceTagSchema = new Schema({
    tag: {
        type: String,
        required: [true, 'Tag field is required!']
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const ServiceTag = mongoose.model('ServiceTag', ServiceTagSchema);
module.exports = { ServiceTag }