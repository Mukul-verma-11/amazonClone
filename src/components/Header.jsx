import React from 'react'
import '../style/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

import { getAuth } from "firebase/auth";

const Header = () => {

  const [{basket,user},dispatch] = useStateValue()
  const auth = getAuth()

  const handleAuthentication = () => {
    if (user) {
       auth.signOut()
    }
  }

  return (
    <div className='header' >

      <Link to='/' >
        <img src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' className='header_logo' alt="" />
      </Link>
          
          <div className="header_search">
              <input type="text" className="header_input" />
              <SearchIcon className='header_SearchIcon'  />
          </div>

          <div className="header_nav">
              
        <Link to={!user && '/login'} >
              <div onClick={handleAuthentication} className="header_options">
                <span className="option_LineOne">{user? user.email : 'Guest'}</span>
            <span className="optionLineTwo">{ user? 'Sign Out' : 'Sign In' }</span>
              </div>
        </Link>

        <Link to='orders' >
              <div className="header_options">
                <span className="option_LineOne">Returns</span>
                <span className="optionLineTwo">& orders</span>
              </div>
        </Link>

              
              <div className="header_options">
                <span className="option_LineOne">Your</span>
                <span className="optionLineTwo">Prime</span>
              </div>

        <Link to='checkout'>
              <div className="header_optionBasket">
                <ShoppingBasketIcon className='header_basket' />
                <span className='header_optionLineTwo header_basketCount' >{basket?.length}</span>
              </div>
        </Link>

          </div>
    </div>
  )
}

export default Header

