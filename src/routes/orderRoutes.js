const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items').sort('-createdAt');
    res.render('dashboard', { orders });
  } catch (error) {
    res.status(500).send('Error fetching orders');
  }
});

router.post('/update-status/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Error updating order status');
  }
});

module.exports = router;