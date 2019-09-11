const { getClients, createClient, deleteClient, updateClient, addVisiteClient, getTheClient, changeAvatar, getTheClientById, deleteMultipleClient } = require('../queries/clients.queries');
const Client = require('../database/models/client.model');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join( __dirname, '../../public/assets/companyLogo'))
    },
    filename: (req, file, cb) => {
        cb(null, `${ Date.now() }-${ file.originalname }`);
    }
}) })

exports.clientsList = async(req, res, next) => {
    try{
        const Clients = await getClients();
        res.json(Clients);
    }catch(e){
        next(e);
    }
}

exports.clientCreate = async(req, res, next) => {
    try{
        const body = req.body;
        await createClient({...body}).then(savedClient => {
            getTheClient(savedClient).then(resp => {
                res.status(200).send(resp[0]._id);
                // res.end();
            })
        });
    }catch(e){
        next(e);
    }
}

exports.clientDelete = async(req, res, next) => {
    try{
        const clientId = req.params.clientId;
        await deleteClient(clientId);
        res.status(200);
        res.end();
    }catch(e){
        next(e);
    }
}

exports.clientEdit = async(req, res, next) => {
    const clientId = req.params.clientId;
    try{
        const body = req.body;
        await updateClient(clientId, body);
        res.status(200);
        res.end();
        
    }catch(e){
        next(e);
    }
}


exports.clientVisite = async(req, res, next) => {
    const clientId = req.params.clientId;
    try{
        const body = req.body;
        await addVisiteClient(clientId, body);
        res.status(200);
        res.end();

    }catch(e){
        next(e);
    }
}

exports.clientAvatar = [
    upload.single('avatar'),
    async(req, res, next) => {
        const clientId = req.params.clientId;
        try{
            const filename = req.file.filename;
            await getTheClientById(clientId).then(client => {
                if(client.companyLogo != 'defaultLogo.png'){
                    fs.unlink(path.join( __dirname, '../../public/assets/companyLogo/'+client.companyLogo), err => {
                        if (err) throw err;
                        console.log('Le fichier a été supprimé.');
                      });
                } else {
                    console.log('pas de path logo existant');
                }
            });
            await changeAvatar(clientId, filename);
            res.status(200).json(filename);
            res.end();
        }catch(e){
            next(e);
        }
    }
]

exports.customerOf = async(req, res, next) => {
    const clientId = req.params.clientId;
    try{
        const body = req.body;
        await updateClient(clientId, body);
        res.status(200);
        res.end();
        
    }catch(e){
        next(e);
    }
}


exports.deleteMultiple = async(req, res, next) => {
    try{
        const body = req.body;
        console.log(body);
        await deleteMultipleClient(body);
        res.status(200);
        res.end();
    }catch(e){
        next(e);
    }
}
