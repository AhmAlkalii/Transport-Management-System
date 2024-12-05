require('dotenv').config();
const stripe = require('stripe')(process.env.Stripe_SECRET_KEY);

const paymentProcessing = async (req, res) => {
    try {
        const { token } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'usd',
            payment_method_data: {
                type: 'card',
                card: {
                    token: token,
                },
            },
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never', 
            },
            confirm: true,
        });

        res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error processing payment.' });
    }
};

module.exports = paymentProcessing;
