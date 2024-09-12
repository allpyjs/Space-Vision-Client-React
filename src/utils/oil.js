import axios from 'axios'
import { API_URL } from './auth'
import moment from 'moment'

const EIA_API_KEY = 'M1TKk38zIbimr79GC7ZYRGk9Ermw1p2fuMkF8uER'
const fetchTableData = async (date = new Date()) => {
  const tableData = []
  await fetch(API_URL + `crude/?end=${moment(date).format('YYYY-MM-DD')}`)
    .then((response) => response.json())
    .then((res) => {
      console.log('ForthGrid', res.data)
      res.data.map((item) => {
        tableData.unshift(item)
      })
    })
  return tableData
}

export const pushEIAData = async (date) => {
  const data = []
  await fetch(
    `https://api.eia.gov/v2/petroleum/sum/sndw/data/?frequency=weekly&data[0]=value&facets[process][]=SAE&facets[process][]=SAS&facets[process][]=SAX&facets[duoarea][]=NUS&facets[product][]=EPC0&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=300&api_key=${EIA_API_KEY}&start=${moment(
      new Date(date + ' 23:59:59'),
    ).format('YYYY-MM-DD')}`,
  )
    .then((response) => response.json())
    .then((res) => {
      const resdata = res.response.data
      resdata.map((item) => {
        const date = moment(new Date(item.period + ' 23:59:59')).format(
          'YYYY-MM-DD',
        )
        if (date !== data[0]?.date) {
          data.unshift({
            date: date,
            SAS: 0,
            SAX: 0,
            SAE: 0,
          })
          data[0][item.process] += item.value
        } else {
          data[0][item.process] += item.value
        }
      })
      console.log('data', data)
    })
    .then(() => {
      data.map((item) => {
        axios.post(API_URL + 'eia/', item)
      })
    })
}

function convertDataToCSV(data) {
  var result, columnDelimiter, lineDelimiter
  columnDelimiter = ','
  lineDelimiter = '\n'
  result = 'Petroleum Stocks,Current Week,,Week Ago,,,Year Ago,'
  result += lineDelimiter
  result += `(Milion Barrels),${data[0]?.date},${data[1]?.date},Difference,Percent Change,${data[52]?.date},Difference,Percent Change`
  result += lineDelimiter
  result += `Crude Oil,${(data[0]?.SAE / 1000).toFixed(1)}, ${(
    data[1]?.SAE / 1000
  ).toFixed(1)}, ${((data[0]?.SAE - data[1]?.SAE) / 1000).toFixed(1)},${(
    (100 * (data[0]?.SAE - data[1]?.SAE)) /
    data[1]?.SAE
  ).toFixed(1)},${(data[52]?.SAE / 1000).toFixed(1)}, ${(
    (data[0]?.SAE - data[52]?.SAE) /
    1000
  ).toFixed(1)},${(
    (100 * (data[0]?.SAE - data[52]?.SAE)) /
    data[52]?.SAE
  ).toFixed(1)}`
  result += lineDelimiter
  result += `Commercial (Excluding SPR),${(data[0]?.SAX / 1000).toFixed(1)}, ${(
    data[1]?.SAX / 1000
  ).toFixed(1)}, ${((data[0]?.SAX - data[1]?.SAX) / 1000).toFixed(1)},${(
    (100 * (data[0]?.SAX - data[1]?.SAX)) /
    data[1]?.SAX
  ).toFixed(1)},${(data[52]?.SAX / 1000).toFixed(1)}, ${(
    (data[0]?.SAX - data[52]?.SAX) /
    1000
  ).toFixed(1)},${(
    (100 * (data[0]?.SAX - data[52]?.SAX)) /
    data[52]?.SAX
  ).toFixed(1)}`
  result += lineDelimiter
  result += `Strategic Petroleum Reserve (SPR),${(data[0]?.SAS / 1000).toFixed(
    1,
  )}, ${(data[1]?.SAS / 1000).toFixed(1)}, ${(
    (data[0]?.SAS - data[1]?.SAS) /
    1000
  ).toFixed(1)},${(
    (100 * (data[0]?.SAS - data[1]?.SAS)) /
    data[1]?.SAS
  ).toFixed(1)},${(data[52]?.SAS / 1000).toFixed(1)}, ${(
    (data[0]?.SAS - data[52]?.SAS) /
    1000
  ).toFixed(1)},${(
    (100 * (data[0]?.SAS - data[52]?.SAS)) /
    data[52]?.SAS
  ).toFixed(1)}`
  return result
}

export async function downloadTable() {
  var data, filename, link
  data = await fetchTableData()
  var csv = ''
  csv += convertDataToCSV(data)
  if (csv == null) return

  filename = filename || 'table-data.csv'

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv
  }

  data = encodeURI(csv)
  link = document.createElement('a')
  link.setAttribute('href', data)
  link.setAttribute('download', filename)
  document.body.appendChild(link) // Required for FF
  link.click()
  document.body.removeChild(link)
}
