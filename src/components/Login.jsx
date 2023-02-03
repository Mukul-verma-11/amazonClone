import React, { useState } from 'react'
import '../style/Login.css'
import { Link, useNavigate } from 'react-router-dom';

import { getAuth } from "firebase/auth";

import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth';
// C:\Program Files\nodejs
function Login() {
    const navigate = useNavigate()
    const [email,setEmail] = useState()
    const [password, setPassword] = useState()
     const auth = getAuth()

    const signIn = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                navigate('/')
            })
        // .catch(err=>alert(err))
    }

    const register = e => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then(navigate('/'))
        .catch(err=>alert(err))

    }

  return (
      <div className='login' >
          <Link to='/' >
          <img className='login_logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="" />
          </Link>

          <div className="login_container">
              <h1>Sign-in</h1>

              <form >
                  <h5>E-mail</h5>
                  <input value={email} required onChange={(e)=> setEmail(e.currentTarget.value)}  type='text' />

                  <h5>Password</h5>
                  <input value={password} required onChange={(e) => setPassword(e.currentTarget.value)} type="password" />

                  <button type='submit'  onClick={signIn} className='login_signInbutton' >Sign In </button>

              </form>

              <p>*Agreeing with Terms and Conditions </p>

              <button onClick={register}  className='login_registerButton' >Create Amazon Account</button>
          </div>

          
    </div>
  )
}

export default Login