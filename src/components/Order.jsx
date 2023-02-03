import React from 'react'
import '../style/Order.css'
import CheckoutProduct from './CheckoutProduct'
import { useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'

function Order({ order }) {
    
    useEffect(() => {
        console.log('order===>>',order);
    },[])

  return (
    <div className='order' >

          {order.basket.map(item => <CheckoutProduct
          key={item.id}
            id={item.id}
            title={item.title}
              image={item.image}
              rating={item.rating}
              price={item.price}
              hideButton = {true}
          />
          )}

          <CurrencyFormat
            renderText={(value) => (
                <h3> Order Total : {value} </h3>
            )}
            decimalScale={2}
            value={order.amount/100}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
        />
    </div>
  )
}

export default Order
