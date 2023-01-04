const mongoose = require('mongoose');

const { DATABASE_URL } = process.env;

exports.connect = async () => {
    try {
        // Connect to the database
        await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Successfully connected to database');
    } catch (error) {
        console.log('Database connection failed. Exiting now...');
        console.error(error);
        process.exit(1);
    }
};
