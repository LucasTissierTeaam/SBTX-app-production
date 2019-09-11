const mongoose = require('mongoose');
var colors = require('colors');
const env = require(`../environment/${ process.env.NODE_ENV }`);

const pass = encodeURIComponent('2VqrS7tIyFFcoNlv');

mongoose.connect(env.dbUrl, {
    useNewUrlParser: true
})
        .then( () => console.log('connexion db ok!'.rainbow))
        .catch( err => console.log(err));


        // mongo "mongodb+srv://cluster0-ygz2g.mongodb.net/test" --username lucas

        // pass Llucas29:)