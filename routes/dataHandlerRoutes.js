const express = require('express');
const router = express.Router();
const handlerCtrl = require('../controllers/dataHandlerController');

router.post('/incoming_data', handlerCtrl.incomingData);

module.exports = router;