import { collection, getDocs } from "firebase/firestore";
import  { useEffect, useState } from 'react'
import React from 'react'
import '../style/Orders.css'
import { db } from "../App";
import Order from './Order'
import { useStateValue } from './StateProvider'



function Orders() {
   const [{basket,user},dispatch] = useStateValue() 
  const [orders,setOrders] = useState([])

  useEffect(() => {
      if (user) {
        
          getDocs(collection(db, "orders")).then(
              (querySnapshot) => {
                  const v = []
                  querySnapshot.forEach((doc) => {
                      console.log(doc.id, " => ", )
                      doc.data().id = doc.id
                      v.push(doc.data())
                    })
                    setOrders(v)
                    console.log(v);
            }
    ).catch(err => {
          console.log('use effect=>',err);
      })
   
    }
  },[])

  return (
      <div className='orders' >
          <h1>Your Orders</h1>
          {/* <h1>{orders.length}</h1> */}
          <div className="orders_order">
              {orders?.map(order => 
                  <Order num={orders.length} order={order}  />
              )}
          </div>
          
    </div>
  )
}

export default Orders