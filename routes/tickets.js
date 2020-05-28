const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');


router.get('/flights/:id/tickets/new', ticketsCtrl.new);
router.post('/flights/tickets/:id', ticketsCtrl.create);
// router.delete('/flights/:id/:tid', ticketsCtrl.delete)


module.exports = router;
