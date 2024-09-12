import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as GoogleIcon } from '../../assets/google-icon.svg'
import { ReactComponent as TwitterIcon } from '../../assets/twitter-icon.svg'
import { ReactComponent as FacebookIcon } from '../../assets/facebook-icon.svg'
import Coursour from '../../components/Coursour'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    localStorage.setItem('email', email)
    navigate('/reset')
  }

  return (
    <div className="auth forgot">
      <Coursour />
      <div className="auth-form">
        <div className="form-header">
          <div className="subtitle">Forgot password?</div>
          <Link className="link" to="/signin">
            <div className="label">Already have an account?</div>
          </Link>
        </div>
        <form className="content">
          <input
            className="form-control"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="submit" onClick={handleSubmit}>
            Sign in
          </button>
          <div className="other">
            <div className="divider">
              <div className="vector" />
              <div className="text">Sing Up with</div>
              <div className="vector" />
            </div>
            <div className="third-party-logins">
              <div className="social-login">
                <div className="label">Google</div>
                <GoogleIcon />
              </div>
              <div className="social-login">
                <div className="label">Twitter</div>
                <TwitterIcon />
              </div>
              <div className="social-login">
                <div className="label">Facebook</div>
                <FacebookIcon />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
