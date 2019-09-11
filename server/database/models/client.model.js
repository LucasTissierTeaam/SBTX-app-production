const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const clientSchema = Schema({
    selection: { type: Boolean, default: false },
    customerOf: [String],
    civilite: String,
    lastName: String,
    firstName: String,
    post: String,
    companyName: String,
    companyAdress: String,
    companyPostCode: String,
    companyCity: String,
    companyType: String,
    cellPhone: String,
    phone: String,
    mail: String,
    companyLogo: { type: String, default: '../../client/assets/companyLogo/defaultLogo.png'},
    infos: String,
    visitesSBTX: []
})

const Client =  mongoose.model('Client', clientSchema);

module.exports = Client;