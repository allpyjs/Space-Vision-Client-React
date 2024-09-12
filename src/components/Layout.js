import React, { useState } from 'react'

import { ReactComponent as LogoIcon } from '../assets/logo.svg'
import { ReactComponent as UserIcon } from '../assets/user-icon.svg'
import { ReactComponent as SettingIcon } from '../assets/setting-icon.svg'
import { ReactComponent as SearchIcon } from '../assets/search.svg'

export const Layout = ({ children }) => {
  const [topTab, setTopTab] = useState(1)
  return (
    <div>
      <div className="header">
        <div className="mid">
          <div className="logo">
            {' '}
            <LogoIcon />{' '}
          </div>
          <div className="center">
            <div className="search-box">
              <input />
              <SearchIcon />
            </div>
            <div className="buttons">
              <div
                className={topTab === 0 ? 'item selected' : 'item'}
                onClick={() => setTopTab(0)}
              >
                Stastics
              </div>
              <div
                className={topTab === 1 ? 'item selected' : 'item'}
                onClick={() => setTopTab(1)}
              >
                Overview
              </div>
              <div
                className={topTab === 2 ? 'item selected' : 'item'}
                onClick={() => setTopTab(2)}
              >
                Dashboard
              </div>
              <div
                className={topTab === 3 ? 'item selected' : 'item'}
                onClick={() => setTopTab(3)}
              >
                Analytics
              </div>
            </div>
          </div>
          <div className="right">
            <UserIcon />
            <SettingIcon />
          </div>
        </div>
      </div>
      <div className="footer">
        <p>ForthGrid</p>
        <p>2022</p>
      </div>
    </div>
  )
}
