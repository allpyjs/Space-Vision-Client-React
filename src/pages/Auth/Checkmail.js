import React from 'react'
import Coursour from '../../components/Coursour'

const Checkmail = () => {
  return (
    <div className="auth checkmail">
      <Coursour />
      <div className="auth-form">
        <div className="form-header">
          <div className="subtitle">Hi, Check Your Mail</div>
          <div className="text">
            We have sent a password recover instructions to your email.
          </div>
        </div>

        <button className="submit">Sing In</button>
      </div>
    </div>
  )
}

export default Checkmail
