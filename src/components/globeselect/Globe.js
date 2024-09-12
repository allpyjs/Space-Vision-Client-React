import React, { useRef, useState } from 'react'
import { ReactComponent as DatePickerIcon } from '../../assets/datepicker.svg'
import { ReactComponent as ShuttleIcon } from '../../assets/shuttle.svg'
import { ReactComponent as WaterIcon } from '../../assets/cardano.svg'
import { ReactComponent as CrudeIcon } from '../../assets/vector-icon.svg'
import { ReactComponent as SequestrationIcon } from '../../assets/avalanche-avax.svg'
import { ReactComponent as PlusIcon } from '../../assets/plus.svg'
import { ReactComponent as MinusIcon } from '../../assets/minus.svg'
import { ReactComponent as MapIcon } from '../../assets/map-icon.svg'
import Moment from 'react-moment'
import MasterContainer from '../MasterContainer'
import GoogleApp from '../map/googleMap'
import Actions from '../../redux/action'
import { connect } from 'react-redux'
import CarbonChart from '../chart/CarbonChart'

import WaterQuality from './WaterQuality'
import { useNavigate } from 'react-router-dom'

const Globe = (props) => {
  const { userConfig } = props
  const [date, setDate] = useState(new Date())
  const [visible, setVisible] = useState(false)
  const [MapType, setMapType] = useState(false)
  const [tab, setTab] = useState()

  const dateRef = useRef()
  const handleClick = () => {
    dateRef.current.showPicker()
  }

  const navigate = useNavigate()

  const ZoomIn = () => {
    let scale = userConfig?.scaleFactor + 0.1
    props.setUserConfig({
      ...userConfig,
      scaleFactor: scale,
    })
  }

  const CrudeClick = () => {
    navigate('/crude')
  }

  return (
    <>
      <div className="globe-container">
        {!MapType && <MasterContainer />}
        {MapType && <GoogleApp />}
      </div>
      {tab == 'Carbon' && <CarbonChart />}
      {tab == 'Water' && <WaterQuality date={date} />}
      <div className="globe-form">
        <div className="date">
          <Moment date={date} format="DD.MM.YYYY" className="label" />
          <DatePickerIcon onClick={handleClick} />
          <input
            type="date"
            className="hidden"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            ref={dateRef}
          />
        </div>
        <div
          className="select"
          onClick={() => setVisible(!visible)}
          onMouseLeave={() => setVisible(false)}
        >
          <div className="shuttle">
            <ShuttleIcon />
          </div>
          <div className={visible ? 'options' : 'options d-none'}>
            <div className="tag">
              <div className="label">Water Quality</div>
              <div className="btn" onClick={() => setTab('Water')}>
                <WaterIcon />
              </div>
            </div>
            <div className="tag">
              <div className="label">Crude Oil Production</div>
              <div className="btn" onClick={() => CrudeClick()}>
                <CrudeIcon />
              </div>
            </div>
            <div className="tag">
              <div className="label">Sequestration</div>
              <div className="btn" onClick={() => setTab('Carbon')}>
                <SequestrationIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="panel-group">
          <div className="panel-option">
            <div className="btn">
              <PlusIcon />
            </div>
            <div className="btn">
              <MinusIcon />
            </div>
          </div>
          <div className="panel-map">
            <div className="btn" onClick={() => setMapType(!MapType)}>
              <MapIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userConfig: state.userConfig,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserConfig: (userConfig) => dispatch(Actions.setUserConfig(userConfig)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Globe)
