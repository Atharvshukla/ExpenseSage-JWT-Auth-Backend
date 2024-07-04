

const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/income');
const authMiddleware = require('../middleware/auth');

router.post('/add', authMiddleware, incomeController.addIncome);
router.get('/get', authMiddleware, incomeController.getIncomes);
router.delete('/delete/:id', authMiddleware, incomeController.deleteIncome);

module.exports = router;
