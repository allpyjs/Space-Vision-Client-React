import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useEffect, useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux'
import Actions from '../../redux/action'
import './map.css'

const libraries = ['places']

const GoogleApp = (props) => {
  const { userPref } = props
  const [latPosiont, setLatPosition] = useState(0)
  const [lngPosition, setLngPosiont] = useState(0)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCQBkQpI4jlGBQ4jCq_wE5mANL6InyztBc',
    libraries,
  })

  const center = useMemo(
    () => ({
      lat: Number(userPref?.coordinate?.latitude),
      lng: Number(userPref?.coordinate?.longitude),
    }),
    [],
  )

  return (
    <>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          mapTypeId="hybrid"
          center={center}
          zoom={5}
          onClick={(e) => {
            console.log(e.latLng.lat(), e.latLng.lng())
            console.log('bounds', e)
            setLatPosition(e.latLng.lat())
            setLngPosiont(e.latLng.lng())
            console.log('lat', latPosiont)
            console.log('lng', lngPosition)
          }}
        ></GoogleMap>
      )}
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(GoogleApp)
