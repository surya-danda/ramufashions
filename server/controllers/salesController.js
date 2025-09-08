const Sale = require('../models/Sale');

// @desc    Add a new sale
// @route   POST /api/sales
const addSale = async (req, res) => {
    const { shop, amount, date } = req.body;

    try {
        const sale = new Sale({
            shop,
            amount,
            date,
            user: req.user._id, // From protect middleware
        });

        const createdSale = await sale.save();
        res.status(201).json(createdSale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all sales for a logged-in user
// @route   GET /api/sales
const getSales = async (req, res) => {
    try {
        const sales = await Sale.find({ user: req.user._id }).sort({ date: -1 }); // newest first
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a sale
// @route   DELETE /api/sales/:id
const deleteSale = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        // Check if the sale belongs to the user trying to delete it
        if (sale.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // --- FIX IS HERE ---
        // Changed from the old sale.remove() to the new sale.deleteOne()
        await sale.deleteOne();
        // --- FIX ENDS HERE ---
        
        res.json({ message: 'Sale removed successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addSale, getSales, deleteSale };