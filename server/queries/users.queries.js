const bcrypt = require('bcrypt');
const User = require('../database/models/user.model');

exports.getUsers = () => {
    return User.find({}).exec();
}

exports.deleteUser = (userId) => {
    return User.findByIdAndDelete(userId).exec();
}

exports.addVisiteUser = (userId, body) => {
    return User.findByIdAndUpdate(userId, {  $push: { myUserVisite : body } }); 
}

exports.updatePassWord = (userId, newP) => {
    return User.findByIdAndUpdate( 
        userId,
        { password: bcrypt.hashSync(newP, bcrypt.genSaltSync(8)) }
    ); 
}

