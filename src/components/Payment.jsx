import React, { useEffect, useState } from 'react'
import '../style/Payment.css'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import { Link } from 'react-router-dom';
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import * as stripe from 'stripe'
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import { async } from '@firebase/util';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../App'; 

const _stripe = stripe('sk_test_51MWC6QSIlNP71BsSpETxj5PB4s5eCM7gAhlvIAefv2SwAzZgTytIB7oeUKNWvPkWkzWRA7IIQm1RY0wZWIkUlNTb00aGpjTKZC')
function Payment() {


  const [{basket,user},dispatch] = useStateValue()
  const stripe = useStripe()
  const elements = useElements()
    
  

  const [error,setError] = useState(null)
  const [disabled,setDisabled] = useState(true)

  const [succeeded,setSucceeded] = useState(false)
  const [processing,setProcessing] = useState('')

  const [clientSecret,setClientSecret] = useState(true)

  
    
  const navigate = useNavigate()


    console.log("secret=>>>>>>>>>>>>>>>",clientSecret);
    // setProcessing(true)
    
    const handleSubmit = async e => {
        e.preventDefault()

        try {
                
            const paymentIntent = await _stripe.paymentIntents.create({
            amount: getBasketTotal(basket)*100,
            currency:'INR'
                })   

            console.log("response.data.clientSecret=>>>>", paymentIntent.client_secret);
            
            const payload = await stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),billing_details: 'string'
                 
                },
            })
            console.log("payload ",payload);

             await addDoc(collection(db, "orders"), {
            basket:basket,
                    amount: payload.paymentIntent.amount,
                created:payload.paymentIntent.created
             });
            
            navigate('/orders')

            } catch (err) {
                console.log('api error',err);

            }

       

        // try {
        //     const payload = await stripe.confirmCardPayment(clientSecret, {
        //         payment_method: {
        //             card:elements.getElement(CardElement)
        //         }
        //     })
        //     console.log("=>>>>>>>>>>>>>>>>>>>>>",payload);
        // } catch (err) {
        //     console.log("err ====>>>>>>>",err);
        // }
            
        

       

            // .then(async (data) => {
            // console.log('working');
            // console.log( data );
            
           
            
            

        //     setSucceeded(true)
        //     setError(null)
        //     setProcessing(false)

        //     dispatch({
        //         type:'EMPTY_BASKET'
        //     })

        //     navigate('/orders')
        // })
         
    }
    
    const handleChange = event => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }
 
  return (
    <div className='payment' >

        <div className="payment_container">
              <h1>
                  Checkout {<Link to='checkout' >{ basket?.length } items</Link>}
            </h1>

              <div className="payment_section">
                  <div className="payment_title">
                      <h3>Delivery Address</h3>
                  </div>

                  <div className="payment_address">
                      <p>{ user?.email }</p>
                      <p>Test- lane 1 </p>
                      <p>Mumbai India</p>
                  </div>
              </div>

              <div className="payment_section">
                  <div className="payment_title">
                      <h3>Review Items and Delivery</h3>
                  </div>
                  <div className="payment_items">
                      
                      {basket.map(item => 
                          <CheckoutProduct
                          id={item.id}
                          title={item.title}
                          image={item.image}
                          rating={item.rating}
                          price={item.price}
                          />
                      )}
                  </div>
              </div>
              <div className="payment_section">
                  <div className="payment_title">
                      <h3>Payment Method</h3>
                </div>
                  <div className="payment_detail">
                      <form onSubmit={handleSubmit} >
                          <CardElement onChange={handleChange} />

                          <div className="payment_priceContainer">
                              <CurrencyFormat
                                  renderText={(value) => (
                                      <h3> Order Total : {value} </h3>
                                  )}
                                  decimalScale={2}
                                  value={getBasketTotal(basket)}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'$'}
                              />
                              <button disabled={processing || disabled || succeeded} >
                                  <span>{ processing ? <p>Processing</p> : "Buy Now"  }</span>
                              </button>
                          </div>
                      </form>
                </div>
              </div>

        </div>
          
    </div>
  )
}

export default Payment