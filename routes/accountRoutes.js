const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/accountController');

router.post('/', accountCtrl.createAccount);
router.get('/', accountCtrl.getAccounts);
router.delete('/:id', accountCtrl.deleteAccount);

module.exports = router;