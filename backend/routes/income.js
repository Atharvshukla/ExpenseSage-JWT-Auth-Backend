

const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/income');
const { isAdmin, requireSignIn } = require("../middleware/auth.js");
router.post('/add',requireSignIn , incomeController.addIncome);
router.get('/get', requireSignIn, incomeController.getIncomes);
router.delete('/delete/:id', requireSignIn, incomeController.deleteIncome);

module.exports = router;
