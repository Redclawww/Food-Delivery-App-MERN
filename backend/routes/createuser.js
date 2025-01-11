const express = require('express');
const user = require('../models/user')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const jwtsecret = "Mynameiskhanandiamthemostshittyperson1234$"

router.post("/createuser", [body('name', 'Invalid Username').isLength({ min: 5 }),
body('email', 'Invalid Email').isEmail(), body('password', 'Invalid password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await user.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            });
            res.json({
                success: true
            })
        } catch (error) {
            console.log(error);
            res.json({
                success: false
            });
        }
    })

router.post("/loginuser", [body('email', 'Invalid Email').isEmail(), body('password', 'Invalid password').isLength({ min: 5 })], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
        let userData = await user.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" });
        }
        let pwdCompare = await bcrypt.compare(req.body.password, userData.password);

        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" });
        }
        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtsecret)
        return res.json({ success: true, authToken: authToken });

    } catch (error) {
        console.log(error);
        res.json({
            success: false
        })
    }
})


module.exports = router;
