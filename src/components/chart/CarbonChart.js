import React, { useEffect, useRef, useState } from 'react'
import { fetchCarbonData } from '../../utils/carbon'
import { CanvasJSChart, CanvasJS } from 'canvasjs-react-charts'

import { ReactComponent as ForestIcon } from '../../assets/forest-icon.svg'
import { ReactComponent as NonforestIcon } from '../../assets/nonforest-icon.svg'
import { ReactComponent as TreeIcon } from '../../assets/tree-icon.svg'
import { ReactComponent as CloudIcon } from '../../assets/cloud-icon.svg'
import { ReactComponent as FireIcon } from '../../assets/fire-icon.svg'
import { ReactComponent as DegradationIcon } from '../../assets/degradation-icon.svg'
import RegionList from '../../data/co2-region.json'
import CountriesList from '../../data/info/countries.json'
import { connect } from 'react-redux'
import Actions from '../../redux/action'

window.CanvasJS = CanvasJS
require('export-canvasjs-chart-data-as-csv')

const CarbonChart = (props) => {
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState(235)

  const [options, setOptions] = useState({})
  const [tab, setTab] = useState(0)
  const CarbonRef = useRef()

  CanvasJS.addColorSet('colorSet1', ['#305629', '#599D5B', '#97674A'])
  CanvasJS.addColorSet('colorSet2', ['#97674A', '#30241E', '#CF3131'])
  CanvasJS.addColorSet('colorSet3', ['#305629', '#599D5B', '#30241E'])

  const fetchData = async () => {
    setLoading(true)
    const data = await fetchCarbonData(id)
    const region = RegionList.find((item) => item.id == id)
    const countries = CountriesList.find((item) => item.name == region.name)
    console.log('countries', countries)
    const selectedInputCoordinate = {
      latitude: `${Number(countries.latitude).toFixed(8)}`,
      longitude: `${Number(countries.longitude).toFixed(8)}`,
    }

    console.log('select', selectedInputCoordinate)
    props.setUserConfig({
      ...props.userConfig,
      selectedInputCoordinate: selectedInputCoordinate,
    })

    console.log('region', region)
    setOptions(data)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    const country = CountriesList.find(
      (item) => item.numeric_code == props.userConfig.selectedCountryCode,
    )
    const region = RegionList.find((item) => item.name == country?.name)
    if (region?.id) {
      setId(region?.id)
    }

    console.log('region', region)
  }, [props.userConfig])

  const DownloadChart = () => {
    CarbonRef.current.chart.exportChart({ format: 'jpeg' })
  }
  return (
    <div className="chart-area">
      <div className="btn download" onClick={DownloadChart}>
        Download
      </div>
      <select value={id} onChange={(e) => setId(e.target.value)}>
        {RegionList.map((item) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>

      <div className="chart">
        <div className="top">
          <div
            className={tab == 0 ? 'tab active' : 'tab'}
            onClick={() => setTab(0)}
          >
            Carbon Stock
          </div>
          <div
            className={tab == 1 ? 'tab active' : 'tab'}
            onClick={() => setTab(1)}
          >
            Emissions
          </div>
          <div
            className={tab == 2 ? 'tab active' : 'tab'}
            onClick={() => setTab(2)}
          >
            Removals
          </div>
        </div>
        <div className="body">
          {!loading && (
            <CanvasJSChart
              className="canvas"
              options={options[tab]}
              ref={CarbonRef}
            />
          )}
        </div>
        <div className="bottom">
          {tab == 0 && (
            <div className="legends">
              <div className="legend">
                <div className="icon total">
                  <CloudIcon />
                </div>
                <div className="line" />
                <div className="label">Total Carbon</div>
              </div>
              <div className="legend">
                <div className="icon green">
                  <ForestIcon />
                </div>
                <div className="line" />
                <div className="label">Carbon in forest areas</div>
              </div>
              <div className="legend">
                <div className="icon brown">
                  <NonforestIcon />
                </div>
                <div className="line" />
                <div className="label">Carbon in Nonforest areas</div>
              </div>
            </div>
          )}
          {tab == 1 && (
            <div className="legends">
              <div className="legend">
                <div className="icon brown">
                  <ForestIcon />
                </div>
                <div className="line" />
                <div className="label">Deforestatin Emissions</div>
              </div>
              <div className="legend">
                <div className="icon black">
                  <DegradationIcon />
                </div>
                <div className="line" />
                <div className="label">Carbon in forest areas</div>
              </div>
              <div className="legend">
                <div className="icon red">
                  <FireIcon />
                </div>
                <div className="line" />
                <div className="label">Carbon in Nonforest areas</div>
              </div>
            </div>
          )}
          {tab == 2 && (
            <div className="legends">
              <div className="legend">
                <div className="icon total">
                  <TreeIcon />
                </div>
                <div className="line" />
                <div className="label">Total Carbon</div>
              </div>
              <div className="legend">
                <div className="icon green">
                  <ForestIcon />
                </div>
                <div className="line" />
                <div className="label">Carbon in forest areas</div>
              </div>
              <div className="legend">
                <div className="icon black">
                  <NonforestIcon />
                </div>
                <div className="line" />
                <div className="label">Carbon in Nonforest areas</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userConfig: state.userConfig,
    userPref: state.userPref,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserConfig: (userConfig) => dispatch(Actions.setUserConfig(userConfig)),
    setUserPref: (userPref) => dispatch(Actions.setUserPref(userPref)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarbonChart)
