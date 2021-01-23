const express = require('express');
const auth = require('./auth');
const router = express.Router();

// daftarkan menu register
router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);


module.exports = router;