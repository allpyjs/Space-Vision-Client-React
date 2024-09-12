import React from 'react'

import { ReactComponent as HexMapIcon } from '../assets/hex-map.svg'
import { ReactComponent as ArrowIcon } from '../assets/arrow-icon.svg'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <Navbar>
      <div className="body">
        <div className="left">
          <div className="title">General statistics</div>
          <div className="subtitle">All Users</div>
          <div className="detail">Detail</div>
          <div className="arrow">
            <ArrowIcon />
          </div>
          <div className="amount">7,541,390</div>
          {/* <div className="total informer">
            <div className="icon">
              <EarningIcon />
            </div>
            <div className="info">
              <div className="info-title">Total earning</div>
              <div className="info-amount">540,320</div>
            </div>
          </div> */}
        </div>
        <div className="right">
          <HexMapIcon />
        </div>
      </div>
      <div className="top-up">
        <div className="content"></div>
      </div>
    </Navbar>
  )
}

export default Home
