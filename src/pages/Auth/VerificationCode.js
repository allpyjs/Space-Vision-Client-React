import React from 'react'
import { Link } from 'react-router-dom'
import Coursour from '../../components/Coursour'

const VerificationCode = ({ email }) => {
  return (
    <div className="verification auth">
      <Coursour />
      <div className="auth-form">
        <div className="form-header-2">
          <div className="subtitle">Enter Verification Code</div>
          <div className="text">We send you on mail</div>
        </div>
        <form className="content">
          <div className="send-text">We've send you code on {email}</div>
          <div className="code-group">
            <input className="code" placeholder="1" />
            <input className="code" placeholder="2" />
            <input className="code" placeholder="3" />
            <input className="code" placeholder="4" />
          </div>
          <button type="submit" className="submit">
            Continue
          </button>
          <div className="resend">
            <div className="send-text">
              Did not receive the email?
              <br />
              Check your spam filter, or
            </div>
            <Link to="#">
              <div className="label">Resend code</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerificationCode
