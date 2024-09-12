import {
  S1GRDAWSEULayer,
  S2L2ALayer,
  WmsLayer,
} from '@sentinel-hub/sentinelhub-js'
import {
  BBox,
  CRS_EPSG4326,
  MimeTypes,
  ApiType,
} from '@sentinel-hub/sentinelhub-js'

export const getUlyssysUrl = async (long, lat, date) => {
  const layer = new WmsLayer({
    baseUrl:
      'https://creodias.sentinel-hub.com/ogc/wms/75f683df-1e1e-4a30-91b5-d632bb74e818',
    layerId: 'ULYSSYS',
  })

  const bbox = new BBox(
    CRS_EPSG4326,
    long - 1.3177,
    lat - 0.452,
    long + 1.3177,
    lat + 0.452,
  )

  const minusOneDay = (day = new Date()) => {
    day.setDate(day.getDate() - 1)
    return day
  }

  const endDate = new Date(date)
  const startDate = minusOneDay(endDate)

  const getMapParams = {
    bbox: bbox,
    fromTime: startDate,
    toTime: new Date(date),
    width: 512,
    height: 512,
    format: MimeTypes.JPEG,
  }

  const ULYSSYSURL = await layer.getMapUrl(getMapParams, ApiType.WMS)

  return ULYSSYSURL
}

export const getOSRTMURL = async (long, lat, date) => {
  const layerS1 = new S1GRDAWSEULayer({
    instanceId: '75f683df-1e1e-4a30-91b5-d632bb74e818',
    layerId: 'OSRTM',
  })

  const bbox = new BBox(
    CRS_EPSG4326,
    long - 1.3177,
    lat - 0.452,
    long + 1.3177,
    lat + 0.452,
  )

  const minusOneDay = (day = new Date()) => {
    day.setDate(day.getDate() - 1)
    return day
  }

  const endDate = new Date(date)
  const startDate = minusOneDay(endDate)

  const getMapParams = {
    bbox: bbox,
    fromTime: startDate,
    toTime: new Date(date),
    width: 512,
    height: 512,
    format: MimeTypes.JPEG,
  }

  const OSRTMURL = await layerS1.getMapUrl(getMapParams, ApiType.WMS)
  return OSRTMURL
}

export const getFGWQIURL = async (long, lat, date) => {
  const layer = new S2L2ALayer({
    instanceId: '75f683df-1e1e-4a30-91b5-d632bb74e818',
    layerId: 'FGWQI',
  })

  const bbox = new BBox(
    CRS_EPSG4326,
    long - 0.3294,
    lat - 0.13,
    long + 0.3294,
    lat + 0.13,
  )

  const minusOneDay = (day = new Date()) => {
    day.setDate(day.getDate() - 1)
    return day
  }

  const endDate = new Date(date)
  const startDate = minusOneDay(endDate)

  const getMapParams = {
    bbox: bbox,
    fromTime: startDate,
    toTime: new Date(date),
    width: 512,
    height: 512,
    format: MimeTypes.JPEG,
  }

  const FGWQIURL = await layer.getMapUrl(getMapParams, ApiType.WMS)

  console.log('url', FGWQIURL)

  return FGWQIURL
}

export const getWLMURL = async (long, lat, date) => {
  const layer = new S2L2ALayer({
    instanceId: '75f683df-1e1e-4a30-91b5-d632bb74e818',
    layerId: 'TRUE-COLOR-S2L2A',
  })

  const bbox = new BBox(
    CRS_EPSG4326,
    long - 0.3294,
    lat - 0.13,
    long + 0.3294,
    lat + 0.13,
  )
  const minusOneDay = (day = new Date()) => {
    day.setDate(day.getDate() - 1)
    return day
  }

  const endDate = new Date(date)
  const startDate = minusOneDay(endDate)
  console.log('date', date)
  const getMapParams = {
    bbox: bbox,
    fromTime: startDate,
    toTime: new Date(date),
    transparent: false,
    width: 512,
    height: 512,
    format: MimeTypes.JPEG,
  }

  const WMLURL = await layer.getMapUrl(getMapParams, ApiType.WMS)

  console.log('WML', WMLURL)
  return WMLURL
}
