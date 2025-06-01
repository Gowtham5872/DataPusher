const express = require('express');
const router = express.Router();
const destCtrl = require('../controllers/destinationController');

router.post('/', destCtrl.createDestination);
router.get('/:account_id', destCtrl.getDestinationsByAccount);
router.delete('/:id', destCtrl.deleteDestination);

module.exports = router;