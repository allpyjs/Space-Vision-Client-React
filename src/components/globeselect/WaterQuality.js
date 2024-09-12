import React, { useEffect, useRef, useState, useMemo } from 'react'
import { ReactComponent as FilterIcon } from '../../assets/filter-icon.svg'
import { ReactComponent as DownArrow2 } from '../../assets/down arrow 2.svg'
import { ReactComponent as DownArrow3 } from '../../assets/down arrow 3.svg'
import {
  getFGWQIURL,
  getOSRTMURL,
  getUlyssysUrl,
  getWLMURL,
} from '../../utils/water'
import Actions from '../../redux/action'
import { connect } from 'react-redux'
import UlyssysWaterMap from './UlyssysWaterMap'
import WaterLevelMap from './WaterLevelMap'
import OilSlickMap from './OilSlickMap'
import ForthGridWaterMap from './ForthGridWaterMap'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import OilSpillMap from './OilSpillMap'

const libraries = ['places']

const WaterQuality = (props) => {
  const { userPref, date } = props
  const lat = Number(userPref?.coordinate?.latitude)
  const long = Number(userPref?.coordinate?.longitude)

  const [waterbody, setWaterbody] = useState({
    long: long,
    lat: lat,
    date: date,
    zoom: [10],
  })

  const [qTab, setQTab] = useState(0)
  const [selected, setSelected] = useState(true)
  const selectRef = useRef()
  const data = [
    { id: 0, label: 'Ulyssys Water Quality Viewer (UWQV)' },
    { id: 1, label: 'Water Level Monitoring' },
    { id: 2, label: 'Oil Slick and Red Tide Monitoring' },
    { id: 3, label: 'ForthGrid Water Quality Index' },
    { id: 4, label: 'Oil Spill Index' },
  ]

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setSelected(true)
    }
  }

  useEffect(() => {
    console.log('date', date)
    setWaterbody({
      ...waterbody,
      date: date,
    })
  }, [date])

  const waterbody0 = {
    long: 18.41721,
    lat: 47.09864,
    date: date,
  }

  const waterbody1 = {
    long: 33.66,
    lat: 39.15,
    date: '2023-03-10',
  }

  const waterbody2 = {
    long: 37.74902,
    lat: 21.02555,
    date: '2019-10-14',
  }

  const waterbody3 = {
    long: -7.435,
    lat: 38.2794,
    date: date,
  }

  const waterbody4 = {
    long: 57.65556,
    lat: -20.45227,
    date: date,
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [])

  const handleChange = (id) => {
    setQTab(id)
    setSelected(true)
  }

  return (
    <div className="water">
      <div className="filter">
        <div className="label">
          <FilterIcon />
          <div className="text">Filter by:</div>
          <div className="select">Name</div>
          <DownArrow2 />
        </div>
        <div className="select" ref={selectRef}>
          <div className="label" onClick={() => setSelected(!selected)}>
            {data[qTab]?.label}
            <DownArrow3 />
          </div>
          {!selected && (
            <div className="options">
              {data.map((item) => (
                <div className="option" onClick={() => handleChange(item.id)}>
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {qTab == 0 && (
        <UlyssysWaterMap waterbody={waterbody} setWaterbody={setWaterbody} />
      )}
      {qTab == 1 && (
        <WaterLevelMap waterbody={waterbody} setWaterbody={setWaterbody} />
      )}
      {qTab == 2 && (
        <OilSlickMap waterbody={waterbody} setWaterbody={setWaterbody} />
      )}
      {qTab == 3 && (
        <ForthGridWaterMap waterbody={waterbody} setWaterbody={setWaterbody} />
      )}
      {qTab == 4 && (
        <OilSpillMap waterbody={waterbody} setWaterbody={setWaterbody} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userPref: state.userPref,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserPref: (userPref) => dispatch(Actions.setUserPref(userPref)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaterQuality)
