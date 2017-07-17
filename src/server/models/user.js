const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define the model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    invoiceTemplate: { type: Schema.Types.Mixed, default: {} },
    invoicesList: { type: Array },
}, { minimize: false });

userSchema.methods.encryptPassword = (user) => {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        // Encrypt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            // Overwrite plain text with encrypted password
            user.password = hash;
        })

    })
}

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;