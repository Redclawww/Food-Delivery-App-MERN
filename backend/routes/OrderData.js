const express = require('express');
const router = express.Router();
const Order = require("../models/Orders");
const app = express();
const cors = require('cors');


app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type'],
    allowedMethods: ['GET', 'POST']
}));


router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId);
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            })
                .then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message);
            res.status("Server Error").send(error.message);
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({
                email: req.body.email
            }, {
                $push: { order_data: data }
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            res.send("server error", error.message)
        }
    }
})

module.exports = router;