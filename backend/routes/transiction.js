// routes/expense.js

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.js');
const incomeController = require('../controllers/income.js');
const { isAdmin, requireSignIn } = require("../middleware/auth.js");


router.post('/add-expense',requireSignIn , expenseController.addExpense);
router.get('/get-expense', requireSignIn , expenseController.getExpenses);
router.delete('/delete-expense/:id', requireSignIn , expenseController.deleteExpense);

router.post('/add-income',requireSignIn , incomeController.addIncome);
router.get('/get-income', requireSignIn, incomeController.getIncomes);
router.delete('/delete-income/:id', requireSignIn, incomeController.deleteIncome);
module.exports = router;
