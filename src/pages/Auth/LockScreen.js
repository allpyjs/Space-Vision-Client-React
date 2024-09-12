import React, { useState } from "react";

import { Link } from "react-router-dom";
import { ReactComponent as EyeSlashIcon } from "../../assets/eye-slash-icon.svg";
import { ReactComponent as EyeIcon } from "../../assets/eye-icon.svg";
import Coursour from "../../components/Coursour";

const LockScreen = () => {
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="lockscreen auth">
      <Coursour />
      <div className="auth-form">
        <div className="profile">
          <div className="avatar" />
          <div className="username">Stebin Ben</div>
        </div>
        <form className="content">
          <div className="subtitle">Enter your password</div>
          <div className="password">
            <input
              name="password"
              className="form-control"
              type={passwordType}
              placeholder="Enter your password"
            />
            <div className="eye-icon" onClick={togglePassword}>
              {passwordType === "password" ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
          </div>
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
        <Link to="/forgot">Forgot password</Link>
      </div>
    </div>
  );
};

export default LockScreen;
