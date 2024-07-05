// routes/expense.js

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');
const { isAdmin, requireSignIn } = require("../middleware/auth.js");


router.post('/add',requireSignIn , expenseController.addExpense);
router.get('/get', requireSignIn , expenseController.getExpenses);
router.delete('/delete/:id', requireSignIn , expenseController.deleteExpense);

module.exports = router;
