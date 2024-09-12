import React, { useCallback, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { ReactComponent as EyeIcon } from '../../assets/eye-icon.svg'
import { ReactComponent as EyeSlashIcon } from '../../assets/eye-slash-icon.svg'
import { ReactComponent as GoogleIcon } from '../../assets/google-icon.svg'
import { ReactComponent as TwitterIcon } from '../../assets/twitter-icon.svg'
import { ReactComponent as FacebookIcon } from '../../assets/facebook-icon.svg'
import { handleSignIn } from '../../utils/auth'
import Coursour from '../../components/Coursour'
import {
  LoginSocialFacebook,
  LoginSocialGoogle,
  LoginSocialTwitter,
} from 'reactjs-social-login'
import {
  FACEBOOK_AUTH_APP_ID,
  GOOGLE_AUTH_CLIENT_ID,
  SocialLogin,
  TWITTER_AUTH_CLIENT_ID,
  TWITTER_AUTH_CLIENT_SECRET,
} from '../../utils/social-auth'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const navigate = useNavigate()
  const [token, setToken] = useState('')

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      return
    }
    setPasswordType('password')
  }
  const REDIRECT_URI = '/'

  useEffect(() => {
    console.log('token', token)
  }, [token, setToken])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      email: email,
      password: password,
    }

    await handleSignIn(user)
    navigate('/')
  }

  const onLogoutFailure = () => {
    localStorage.clear()
  }

  return (
    <div className="auth sign-in">
      <Coursour />
      <div className="auth-form">
        <div className="form-header">
          <div className="subtitle">Sign in</div>
          <Link className="link" to="/signup">
            <div className="label">I don't have an account</div>
          </Link>
        </div>
        <form className="content">
          <input
            className="form-control email"
            value={email}
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <div className="password">
            <input
              name="password"
              className="form-control"
              value={password}
              type={passwordType}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <div className="eye-icon" onClick={togglePassword}>
              {passwordType === 'password' ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
          </div>
          <button className="submit" onClick={handleSubmit}>
            Sing In
          </button>
          <div className="other">
            <Link className="forget" to="/forgot">
              Forgot password?
            </Link>
            <div className="divider">
              <div className="vector" />
              <div className="text">Sing in with</div>
              <div className="vector" />
            </div>
            <div className="third-party-logins">
              <LoginSocialGoogle
                client_id={GOOGLE_AUTH_CLIENT_ID}
                onLogoutFailure={onLogoutFailure}
                onResolve={({ provider, data }) => {
                  SocialLogin(data.access_token)
                }}
                onReject={(err) => {
                  console.log(err)
                }}
              >
                <div className="social-login">
                  <div className="label">Google</div>
                  <GoogleIcon />
                </div>
              </LoginSocialGoogle>

              <LoginSocialTwitter
                client_id={TWITTER_AUTH_CLIENT_ID}
                client_secret={TWITTER_AUTH_CLIENT_SECRET}
                redirect_uri={REDIRECT_URI}
                onResolve={({ provider, data }) => {
                  SocialLogin(data.access_token)
                }}
                onReject={(err) => {
                  console.log(err)
                }}
              >
                <div className="social-login">
                  <div className="label">Twitter</div>
                  <TwitterIcon />
                </div>
              </LoginSocialTwitter>

              <LoginSocialFacebook
                appId={FACEBOOK_AUTH_APP_ID}
                fieldsProfile={
                  'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                }
                onResolve={({ provider, data }) => {
                  SocialLogin(data.access_token)
                }}
                onReject={(err) => {
                  console.log(err)
                }}
              >
                <div className="social-login">
                  <div className="label">Facebook</div>
                  <FacebookIcon />
                </div>
              </LoginSocialFacebook>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
