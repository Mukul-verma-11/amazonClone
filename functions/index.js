const express = require('express')
const cors = require("cors")

const functions = require("firebase-functions");
const stripe = require("stripe")('sk_test_51MWC6QSIlNP71BsSpETxj5PB4s5eCM7gAhlvIAefv2SwAzZgTytIB7oeUKNWvPkWkzWRA7IIQm1RY0wZWIkUlNTb00aGpjTKZC')

const app = express()

app.use(cors({origin:true}))

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('hello World')
})

app.post('/payment/create', async (req, res) => {
    const total = req.query.total

    try {
        
        console.log('Payment Request Received Boom ', total)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency:'usd'
        })
        console.log("paymentIntent",paymentIntent);
    } catch (err) {
        console.log(err);
    }


    res.status(201).send({
        clientSecret :paymentIntent.client_secret,
    })
})


 
exports.api = functions.https.onRequest(app)