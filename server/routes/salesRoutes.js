const express = require('express');
const router = express.Router();
const { addSale, getSales, deleteSale } = require('../controllers/salesController');
const { protect } = require('../middleware/authMiddleware');

// All routes here are protected
router.route('/')
    .post(protect, addSale)
    .get(protect, getSales);

router.route('/:id')
    .delete(protect, deleteSale);

module.exports = router;