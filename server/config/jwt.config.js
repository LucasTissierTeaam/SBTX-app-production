const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user.model');
const fs = require('fs');

const RSA_KEY_PRIVATE = fs.readFileSync('./rsa/key');

exports.createJwtToken = (user) => {
    const jwtToken = jwt.sign({ sub: user._id.toString() }, RSA_KEY_PRIVATE,{
        algorithm: 'HS256'
    });
    return jwtToken;
}



