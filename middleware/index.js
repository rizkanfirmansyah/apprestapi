const { response } = require('express');
const express = require('express');
const auth = require('./auth');
const verify = require('./verify');
const router = express.Router();
var verify = require('./verify');

// daftarkan menu register
router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

// alamat yang perlu authorizaion
router.get('api/v/rahasia', verify(1), auth.halamanrahasia);

module.exports = router;