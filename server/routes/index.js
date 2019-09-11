const express = require('express');
const router = express.Router();

var path = require('path');

const auth = require('./auth');
const users = require('./users');
const clients = require('./clients');

// ajout
let http            = require('http');
let server          = http.Server(express());
var nodemailer      = require("nodemailer");
var ejs             = require('ejs');
var fs              = require('fs');
var template        = fs.readFileSync(path.join( __dirname, './email.html'),{encoding:'utf-8'});

router.use('/api/auth', auth);
router.use('/api/user', users);
router.use('/api/clients', clients);

// MAILER
router.post('/send/mail', (req, res) => {
    const body = req.body;
    console.log(body);

    var mail_data = {
        "to": body.userMail,
        "subject": "Votre sélection de mails",
        "msg": body.mailList
    }
    
    var transport = nodemailer.createTransport({
        host: "ssl0.ovh.net",
        port: 465,
        secure: true,
        auth: {
            user: "lucas@lucas-folio.com",
            pass: "Llucas29:)" 
        }            
    });
    
    var mailOptions = {
        from: '"SBTX App" <lucas@lucas-folio.com>',
        to: mail_data.to,
        subject: mail_data.subject,
        html: ejs.render(template, {'msg': mail_data.msg })
    };   
    
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });  
    
    
    res.json({
        'success': true,
        'match': true
    });
});
// FIN MAILER

module.exports = router;