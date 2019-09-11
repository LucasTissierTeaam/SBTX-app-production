const Client = require('../database/models/client.model');

exports.getClients = () => {
    return Client.find({}).exec();
}

exports.createClient = (client) => {
    const newClient = new Client(client);
    return newClient.save();
}

exports.deleteClient = (clientId) => {
    return Client.findByIdAndDelete(clientId).exec();
}


exports.updateClient = (clientId, client) => {
    return Client.findByIdAndUpdate(clientId, { $set: client }); 
}

exports.addVisiteClient = (clientId, body) => {
    return Client.findByIdAndUpdate(clientId, {  $push: { visitesSBTX : body } }); 
}

exports.getTheClient = (theAlias) => {
    return Client.find({ 
        lastName: theAlias.lastName,
        firstName: theAlias.firstName,
        post: theAlias.post,
        companyAdress: theAlias.companyAdress,
        mail: theAlias.mail
}).exec();
}

exports.changeAvatar = (clientId, filename) => {
    return Client.findByIdAndUpdate(clientId, { $set: { companyLogo : filename } }); 
}

exports.getTheClientById = (clientId) => {
    return Client.findById(clientId).exec();
}

exports.deleteClient = (clientId) => {
    return Client.findByIdAndDelete(clientId).exec();
}

exports.deleteMultipleClient = (body) => {
    for (let index = 0; index < body.length; index++) {
        const clientId = body[index];
        Client.findByIdAndDelete(clientId).exec();
    }
    return
}
