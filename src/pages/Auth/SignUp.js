import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as EyeIcon } from '../../assets/eye-icon.svg'
import { ReactComponent as EyeSlashIcon } from '../../assets/eye-slash-icon.svg'
import { ReactComponent as GoogleIcon } from '../../assets/google-icon.svg'
import { ReactComponent as TwitterIcon } from '../../assets/twitter-icon.svg'
import { ReactComponent as FacebookIcon } from '../../assets/facebook-icon.svg'
import { handleSignUp } from '../../utils/auth'
import Coursour from '../../components/Coursour'

const SignUp = () => {
  const [strength, setStrength] = useState('')
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })
  const [passwordType, setPasswordType] = useState('password')
  const navigate = useNavigate()

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      return
    }
    setPasswordType('password')
  }

  const handleChangePassword = (e) => {
    setUser({
      ...user,
      password: e.target.value,
    })
    checkStrength(e.target.value)
  }

  const checkStrength = (password) => {
    let strengthValue = 0
    const validateRegex = ['[A-Z]', '[a-z]', '[0-9]', '\\W']
    validateRegex.forEach((regex, i) => {
      if (new RegExp(regex).test(password)) {
        strengthValue += 1
      }
    })
    console.log(strengthValue)
    switch (strengthValue) {
      case 0:
        return setStrength('')
      case 1:
        return setStrength('poor')
      case 2:
        return setStrength('good')
      case 3:
        return setStrength('good')
      case 4:
        return setStrength('strong')
      default:
        return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleSignUp(user)
    navigate('/')
  }

  return (
    <div className="auth sign-up">
      <Coursour />
      <div className="auth-form">
        <div className="form-header">
          <div className="subtitle">Sign up</div>
          <Link className="link" to="/signin">
            <div className="label">Alreay have an account?</div>
          </Link>
        </div>
        <form className="content">
          <input
            className="form-control"
            name="firstname"
            type="text"
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            placeholder="First name"
          />
          <input
            className="form-control"
            name="lastname"
            type="text"
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            placeholder="Last name"
          />
          <input
            className="form-control"
            name="email"
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />
          <div className="password">
            <input
              name="password"
              className="form-control"
              type={passwordType}
              onChange={handleChangePassword}
              placeholder="Enter your password"
            />
            <div className="eye-icon" onClick={togglePassword}>
              {passwordType === 'password' ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
          </div>
          <div className="progress">
            <div className={`strength ${strength}`}>
              <div className="step first" />
              <div className="step second" />
              <div className="step third" />
            </div>
            <div className="label">{strength}</div>
          </div>
          <div className="checkbox">
            <input type="checkbox" />
            <div className="label">Agree with Terms & Condition.</div>
          </div>
          <button className="submit" onClick={handleSubmit}>
            Sing Up
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

export default SignUp
