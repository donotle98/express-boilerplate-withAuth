require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(401)
                .json({ success: false, errors: errors.array() });
        }

        //change this based on what you want your user to authenticate
        const { email, password } = req.body;

        //service function to grab user from database
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                errors: [{ msg: 'Invalid email or password' }],
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                errors: [{ msg: 'Invalid email or password' }],
            });
        }

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
        res.status(500).json({
            success: false,
            errors: [{ msg: 'Server error: Failed to login user' }],
        });
    }
};
