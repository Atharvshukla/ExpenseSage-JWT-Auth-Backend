// routes/expense.js

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');
const authMiddleware = require('../middleware/auth');

router.post('/add', authMiddleware, expenseController.addExpense);
router.get('/get', authMiddleware, expenseController.getExpenses);
router.delete('/delete/:id', authMiddleware, expenseController.deleteExpense);

module.exports = router;
