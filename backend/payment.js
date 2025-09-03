const express = require('express');
const Stripe = require('stripe');
const router = express.Router();
const stripe = Stripe('your_stripe_secret_key');

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});

module.exports = router;
