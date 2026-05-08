const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        // Check if admin exists
        const adminEmail = 'admin@travelcrm.com';
        const adminPassword = 'admin123';
        let admin = await User.findOne({ email: adminEmail });

        if (!admin) {
            await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: adminPassword,
                role: 'admin'
            });
            console.log('Admin user created successfully');
        } else {
            admin.password = adminPassword;
            await admin.save();
            console.log('Admin user already exists, password updated');
        }

        process.exit();
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
