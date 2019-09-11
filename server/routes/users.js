const router = require('express').Router();
const fs = require('fs');
const RSA_PUBLIC_KEY = fs.readFileSync('./rsa/key.pub');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user.model');
const { usersList, userDelete, userVisite, userChangePassword } = require('../controllers/user.controller');

function isLoggedIn(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, RSA_PUBLIC_KEY, (err, decoded) => {
      if (err) { return res.status(401).json('token invalid'); }
      const sub = decoded.sub;
      User.findOne({ '_id': sub }).exec( (err, user) => {
        if (err || !user) { res.status(401).json('error') }
        req.user = user;
        next();
      })
    })
  } else {
    res.status(401).json('pas de token !');
  }
}


router.get('/current', isLoggedIn, (req, res) => {
  res.json(req.user);
})

router.get('/list', usersList);

router.delete('/delete/:userId', userDelete);
router.put('/visite/:userId', userVisite);
router.put('/change-pass/:userId', userChangePassword);



module.exports = router;