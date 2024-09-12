import React, { useEffect } from 'react';

import { ReactComponent as MiniLogo } from '../assets/mini-logo.svg';
import { ReactComponent as DashboardIcon } from '../assets/dashboard-icon.svg';
import { ReactComponent as OptionsIcon } from '../assets/options.svg';
import { ReactComponent as WorldIcon } from '../assets/world-icon.svg';
import { ReactComponent as PaymentIcon } from '../assets/payment.svg';
import { ReactComponent as NotificationIcon } from '../assets/notification.svg';
import { ReactComponent as SettingIcon } from '../assets/setting.svg';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ tab }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return navigate('/signin');
  });

  return (
    <>
      <div className="sidebar">
        <div className="top">
          <div className="logo">
            <MiniLogo />
          </div>
          <div className="menu">
            <div />
            <div />
            {/* <Link className={tab === 0 ? 'active' : ''} to="/">
              <DashboardIcon />
            </Link>
            <Link className={tab === 1 ? 'active' : ''} to="/options">
              <OptionsIcon />
            </Link> */}
            <Link className={tab === 2 ? 'active' : ''} to="/">
              <WorldIcon />
            </Link>
            <Link className={tab === 3 ? 'active' : ''} to="/crude">
              <PaymentIcon />
            </Link>
          </div>
          <Link className={tab === 4 ? 'active' : ''} to="/notification">
            <NotificationIcon />
          </Link>
        </div>
        <div className="bottom">
          <div className="profile">
            <div className="avatar">
              <div className="online" />
            </div>
          </div>
          <Link to="">
            <SettingIcon />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
