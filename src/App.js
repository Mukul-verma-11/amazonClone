import './App.css';
import Header from './components/Header'
import Home from './components/Home';
import Checkout from './components/Checkout';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

import { getAuth } from "firebase/auth";

import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import { useEffect } from 'react';
import { firebaseConfig } from './firebase';
import { useStateValue } from './components/StateProvider';
import Payment from './components/Payment';
import Orders from './components/Orders';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const promise = loadStripe('pk_test_51MWC6QSIlNP71BsSduOYmjY4kwdKfCOB0z6lcQg2FA01wkcaHMcOZJRfTorV9ECb6GrT6wEtBPg4iFA4iEeFlqqg0089GSsHBM')

const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp);

function App() {
  const [{ }, dispatch] = useStateValue()
  const auth = getAuth()
  
  

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('The user is => ', authUser);
      
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user:authUser
        })
      }
      else {
        dispatch({
          type: 'SET_USER',
          user:null
        })
      }
    })
  },[])

  return (
    <Router>
      <div className="App">
        

        <Routes>
         <Route path="/" element={[<Header key='Header' />,<Home key='Home' />]} />
          <Route path="checkout" element={[<Header key='Header' />,<Checkout/>]} />
          <Route path="login" element={<Login/>} />
          <Route path="orders" element={[<Header/>,<Orders/>]} />
          <Route path="payment" element={[<Header key='Header' />,
            <Elements stripe={promise} ><Payment /></Elements>]} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
