const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    companyName: String,
    admin: String,
    civilite: String,
    lastName: String,
    firstName: String,
    userName: String,
    password: String,
    mail: String,
    myUserVisite: []
    // avatar: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;