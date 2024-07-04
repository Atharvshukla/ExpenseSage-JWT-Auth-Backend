const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false); // Adjust mongoose settings if necessary

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.error('DB Connection Error:', error.message);
        process.exit(1); // Exit with failure
    }
};

module.exports = { db };
