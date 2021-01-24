const { response } = require('express');
const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

// daftarkan menu register
router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

// alamat yang perlu authorizaion
router.get('/api/v1/rahasia', verifikasi(), auth.halamanrahasia);

module.exports = router;