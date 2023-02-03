import React from 'react'
import '../style/Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider';

function Checkout() {

  const [{basket,user},dispatch] = useStateValue() 

  return (
    <div className='checkout' >

          
        <div className="checkout_left">
                <img
                className="checkout_ad"
                src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                alt=""
                />

        <div>
          <h3>Hello, {user? user.email : 'Guest'}</h3>
              <h2 className="checkout_title">
                  Your Shopping Basket
          </h2>
          
          {basket.map(item => (

            <CheckoutProduct 
              key={item.id}
            id={item.id}
            title={item.title}
              image={item.image}
              rating={item.rating}
              price = {item.price}
            />
          ))}

        </div>
        </div>
        

        
          <div className="checkout_right">
              <Subtotal />
              {/* <h2>Subtotal goes here</h2> */}
        </div>

    </div>
  )
}

export default Checkout