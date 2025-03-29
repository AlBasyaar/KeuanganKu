const express = require('express');
const router = express.Router();
const { tambahTransaksi, daftarTransaksi, hapusTransaksi, editTransaksi } = require('./handlers');

router.get('/transaksi', daftarTransaksi);
router.post('/transaksi', tambahTransaksi);
router.delete('/transaksi/:id', hapusTransaksi);
router.put('/transaksi/:id', editTransaksi);

module.exports = router