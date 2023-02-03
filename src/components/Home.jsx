import React from 'react'
import '../style/Home.css'
import Product from './Product'
import bg from '../image/bg_amazon.jpg'

function Home() {
  return (
      <div className='home' >
          <div className="home_container">
              <img
                  src={bg}
                  className='home_image'
                  alt="" />
          </div>

          <div className="home_row">
        <Product
          id={1}
              title='the lean startup | Starting a business can be a daunting task, but with the right mindset and strategy'
              price={29.99}
              image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg'
              rating={5}
              />

        <Product
          id={2}
              title='Jabra Evolve 40 UC Stereo Headset | Experience the future of audio technology with our state-of-the-art headset'
              price={54}
              image='https://m.media-amazon.com/images/I/61apHvYK6GL._AC_SX679_.jpg'
              rating={4}
              />

          </div>



          <div className="home_row">
        <Product
          id={3}
              title='NITRO: The Incredible Rise and Inevitable Collapse of Ted Turners WCW'
              price={15}
              image='https://m.media-amazon.com/images/I/41ghnBTjbcL._SY291_BO1,204,203,200_QL40_ML2_.jpg'
              rating={4}
              />

        <Product
          id={4}
              title='Razer Hammerhead True Wireless X - Low Latency Earbuds'
              price={39}
              image='https://m.media-amazon.com/images/I/51C+6wv40VL._AC_SX679_.jpg'
              rating={3}
              />

        <Product
          id={5}
              title='Gen 3 phantom drone with 1080p video streaming'
              price={158}
              image='https://m.media-amazon.com/images/I/61Y1P6uIRFL._AC_SX425_.jpg'
              rating={4}
              />
          </div>



          <div className="home_row">

        <Product
          id={6}
              title='Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black) | The monitor has a 4K resolution and a wide viewing angle that provides stunning visuals.'
              price={1780}
              image='https://m.media-amazon.com/images/I/71MlcO29QOL._SX522_.jpg'
              rating={4}
              />
 
            
          </div>


    </div>
  )
}

export default Home