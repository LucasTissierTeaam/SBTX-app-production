const express = require('express');
const router = express.Router();
const {
    clientsList,
    clientCreate,
    clientDelete, 
    clientEdit, 
    clientVisite, 
    clientAvatar, 
    customerOf, 
    deleteMultiple 
} = require('../controllers/clients.controller');


router.get('/list', clientsList);
router.post('/create', clientCreate);
router.delete('/delete/:clientId', clientDelete);
router.put('/edit/:clientId', clientEdit);
router.put('/visite/:clientId', clientVisite);
router.post('/avatar/:clientId', clientAvatar);
router.put('/customerof/:clientId', customerOf);
router.put('/deleteMultiple', deleteMultiple);






module.exports = router;