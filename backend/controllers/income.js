// controllers/income.js

const IncomeModel = require("../models/IncomeModel");
const UserModel = require("../models/UserModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const income = new IncomeModel({
            title,
            amount,
            category,
            description,
            date,
            user: user._id
        });

        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getIncomes = async (req, res) => {
    const userId = req.user.id;

    try {
        const incomes = await IncomeModel.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const income = await IncomeModel.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        if (income.user.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await IncomeModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
