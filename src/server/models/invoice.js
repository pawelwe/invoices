const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the model
const invoiceSchema = new Schema({
    email:  { type: String, unique: true, lowercase: true },
    password: String
});

// Create the model class
const ModelClass = mongoose.model('invoice', invoiceSchema);

// Export the model
module.exports = ModelClass;