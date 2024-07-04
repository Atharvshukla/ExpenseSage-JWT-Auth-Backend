// controllers/expense.js

const ExpenseModel = require("../models/ExpenseModel");
const UserModel = require("../models/UserModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const expense = new ExpenseModel({
            title,
            amount,
            category,
            description,
            date,
            user: user._id
        });

        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getExpenses = async (req, res) => {
    const userId = req.user.id;

    try {
        const expenses = await ExpenseModel.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const expense = await ExpenseModel.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        if (expense.user.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await ExpenseModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
