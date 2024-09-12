import React from 'react'
import Navbar from '../components/Navbar'
import { ReactComponent as PlanetIcon } from '../assets/planet.svg'

const Dashboard = () => {
  return (
    <div className="container">
      <Navbar tab={0} />
      <div className="planet">
        <PlanetIcon />
      </div>
    </div>
  )
}

export default Dashboard
