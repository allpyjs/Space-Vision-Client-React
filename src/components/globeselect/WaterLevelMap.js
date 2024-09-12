import React from 'react'
import Map from './Map'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { layerControlSimple } from 'mapbox-layer-control/layerControlSimple'

const WaterLevelMap = (props) => {
  const { waterbody, setWaterbody } = props

  const SH_INSTANCE_ID = '778d50e7-44ad-45ce-ad2b-317b3a567d59'
  const LINE_LAYOUT = {
    'line-cap': 'round',
    'line-join': 'round',
  }
  const NOMINAL_OUTLINE_LINE_PAINT = {
    'line-color': '#26accc',
    'line-width': 2,
  }
  const MEASUREMENT_OUTLINE_LINE_PAINT = {
    'line-color': '#e8c26e',
    'line-width': 2,
  }
  const MAP_CONTAINER_STYLE = {
    height: '100%',
    width: '100%',
  }
  const FIT_BOUNDS_OPTIONS = { duration: 0, padding: 50 }
  const DEFAULT_ZOOM = [10]

  const state = {
    centerLngLat: undefined,
  }

  const minusOneDay = (day = new Date()) => {
    day.setDate(day.getDate() - 1)
    return day
  }

  const endDate = new Date(waterbody.date)
  const startDate = minusOneDay(endDate)

  const timeInterval = `${startDate}/${new Date(waterbody.date)}`

  const geocoder = new MapboxGeocoder({
    accessToken:
      'pk.eyJ1IjoienVwYW5jIiwiYSI6ImNqZWl4ZHlvdDBsejEycW1la24zYnJ3bGYifQ.49jUBh2Y3g2bOFLk3_-g2w',
    types: 'poi',
    // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
    render: function (item) {
      // extract the item's maki icon or use a default
      const maki = item.properties.maki || 'marker'
      return `<div class='geocoder-dropdown-item'>
    <span class='geocoder-dropdown-text'>
    ${item.text}
    </span>
    </div>`
    },
    mapboxgl: Map,
    zoom: [10],
  })

  const onMapLoad = (map) => {
    if (window.height !== map._container.clientHeight) {
      map.resize()
    }
    map.addSource('sentinel-hub-tiles', {
      type: 'raster',
      tiles: [
        `https://creodias.sentinel-hub.com/ogc/wms/${SH_INSTANCE_ID}?version=1.1.1&showLogo=False&service=WMS&request=GetMap&layers=TRUE-COLOR-S2L2A&time=${timeInterval}&styles=&format=image%2Fjpeg&transparent=false&maxcc=100&height=512&width=512&srs=EPSG%3A3857&bbox={bbox-epsg-3857}`,
      ],
      tileSize: 512,
    })
    map.addLayer({
      id: 'Sentinel',
      type: 'raster',
      source: 'sentinel-hub-tiles',
      layout: {
        visibility: 'visible',
      },
      minzoom: 0,
      maxzoom: 22,
    })
    map.addControl(geocoder)

    map.addControl(
      new layerControlSimple({
        layers: ['Sentinel'],
      }),
    )
  }

  const onMove = (e) => {
    console.log('move', e.transform._center)
    const center = e.transform._center
    setWaterbody({
      long: center.lng,
      lat: center.lat,
    })
  }

  return (
    <div className="waterbody-map">
      <Map
        center={[waterbody.long, waterbody.lat]}
        // fitBounds={bbox(waterbody.nominal_outline)}
        fitBoundsOptions={FIT_BOUNDS_OPTIONS}
        movingMethod="jumpTo"
        zoom={waterbody.zoom}
        onStyleLoad={onMapLoad}
        onMoveEnd={(e) => onMove(e)}
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={MAP_CONTAINER_STYLE}
      ></Map>
    </div>
  )
}

export default WaterLevelMap
