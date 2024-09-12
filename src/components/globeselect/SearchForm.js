import React, { useRef, useState } from 'react'
import { ReactComponent as DatePickerIcon } from '../../assets/datepicker.svg'
import { ReactComponent as LeftArrowIcon } from '../../assets/left-arrow.svg'
import { ReactComponent as RightArrowIcon } from '../../assets/right-arrow.svg'
import { Flex } from '@chakra-ui/react'
import Moment from 'react-moment'
import axios from 'axios'

const SearchForm = ({ children }) => {
  const [startDate, setStartDate] = useState('2021-08-16')
  const [endDate, setEndDate] = useState('2021-08-16')
  const [data, setData] = useState([])
  const startRef = useRef()
  const endRef = useRef()
  const handleClickStart = () => {
    startRef.current.showPicker()
  }
  const handleClickEnd = () => {
    endRef.current.showPicker()
  }

  const handleClick = async () => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    await GetCarbonData(start, end)
    console.log('data', data)
  }

  const GetCarbonData = async (start, end) => {
    let coordinate = JSON.parse(localStorage.getItem('coordinate'))
    const APPID = '0619d326d92f5b6f9b6582ea17710940'
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${
          coordinate.latitude
        }&lon=${coordinate.longitude}&start=${start / 1000}&end=${
          end / 1000
        }&appid=${APPID}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then((res) => {
        const list = res.data.list
        list.map((item, i) => (data[i] = [item.dt * 1000, item.components.co]))
      })
  }

  const today = new Date()
  return (
    <div className="step-form">
      <div className="section">
        <div className="section-title">Location</div>
        <Flex flexDirection={'column'} width={'100%'} gap={'12px'}>
          <div className="subtitle">Region</div>
          {children}
        </Flex>
      </div>
      <div className="line" />
      <div className="section">
        <div className="section-title">Timing</div>
        <Flex flexDirection={'column'} width={'100%'} gap={'12px'}>
          <div className="subtitle">Frequency</div>
          <select width={'100%'} className="select">
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
          <Flex flexDirection={'row'} gap={'16px'}>
            <div className="date">
              <DatePickerIcon onClick={handleClickStart} />
              <Moment
                date={startDate}
                format="DD MMMM YYYY"
                className="label"
              />
              <input
                type="date"
                max={endDate}
                value={startDate}
                ref={startRef}
                className="hidden date"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="date">
              <DatePickerIcon onClick={handleClickEnd} />
              <Moment date={endDate} format="DD MMMM YYYY" className="label" />
              <input
                type="date"
                className="date hidden"
                value={endDate}
                ref={endRef}
                min={startDate}
                max={today}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </Flex>
        </Flex>
      </div>
      <div className="btn-group">
        <div className="btn black">
          <LeftArrowIcon />
          Back
        </div>
        <div className="btn purple" onClick={handleClick}>
          Next
          <RightArrowIcon />
        </div>
      </div>
    </div>
  )
}

export default SearchForm
