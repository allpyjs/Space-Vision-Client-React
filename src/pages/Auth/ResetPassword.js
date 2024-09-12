import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as EyeIcon } from '../../assets/eye-icon.svg'
import { ReactComponent as EyeSlashIcon } from '../../assets/eye-slash-icon.svg'
import Coursour from '../../components/Coursour'
import { handleReset } from '../../utils/auth'

const ResetPassword = () => {
  const [strength, setStrength] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const [confirmType, setConfirmType] = useState('password')
  const navigate = useNavigate()

  useEffect(() => {
    const email = localStorage.getItem('email')
    if (!email) {
      return navigate('/')
    }
  })

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      return
    }
    setPasswordType('password')
  }

  const toggleConfirm = () => {
    if (confirmType === 'password') {
      setConfirmType('text')
    } else {
      setConfirmType('password')
    }
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
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
    if (password === confirm) {
      try {
        await handleReset({
          email: localStorage.getItem('email'),
          password: password,
        })
        navigate('/signin')
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error', 'Password does not match')
    }
  }

  return (
    <div className="reset auth">
      <Coursour />
      <div className="auth-form">
        <div className="form-header-2">
          <div className="subtitle">Reset Password</div>
          <div className="text">Please choose our new password</div>
        </div>
        <form className="content">
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
          <div className="password">
            <input
              name="confirm"
              className="form-control"
              type={confirmType}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Enter your confirm password"
            />
            <div className="eye-icon" onClick={toggleConfirm}>
              {confirmType === 'password' ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
          </div>
          <button className="submit" onClick={handleSubmit}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
