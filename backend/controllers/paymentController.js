import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay instance with your keys
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    const { amount, currency } = req.body;
    
    const options = {
        amount: amount * 100, // Razorpay deals in smallest currency units (paisa for INR)
        currency: currency,
        receipt: `receipt_${crypto.randomBytes(4).toString('hex')}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating Razorpay order' });
    }
};
