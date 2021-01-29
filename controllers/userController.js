const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        //change based on what you want users to sign up with
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        //Service function to insert user into database
        const user = await insertUser(email, username, hashedPassword);

        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: 'HS226',
            expiresIn: process.env.REFRESH_TOKEN_LIFE,
        });

        res.json({
            success: true,
            user: payload,
            accessToken,
        });
    } catch (err) {
        res.status.json({
            success: false,
            errors: [{ msg: 'Server error: Failed to create user' }],
        });
    }
};
