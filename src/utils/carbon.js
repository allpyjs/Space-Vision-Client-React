import axios from 'axios'

export const fetchCarbonData = async (id) => {
  const carbonData = {
    stock: {
      total: [],
      forest: [],
      nonforest: [],
    },
    emission: {
      deforestation: [],
      degradation: [],
      fire: [],
    },
    removal: {
      total: [],
      forest: [],
      nonforest: [],
    },
  }
  await axios
    .get(`https://api.dev.ctre.es/carbon?level=0&id=${id}`)
    .then((res) => {
      res.data.map((item) => {
        carbonData.stock.total.push({
          x: new Date(item.year, 0),
          y: item.jurisdiction,
        })
        carbonData.stock.forest.push({
          x: new Date(item.year, 0),
          y: item.forest,
        })
        carbonData.stock.nonforest.push({
          x: new Date(item.year, 0),
          y: item.nonforest,
        })
      })
    })

  await axios
    .get(`https://api.dev.ctre.es/emissions?level=0&id=${id}`)
    .then((res) => {
      res.data.map((item) => {
        carbonData.emission.deforestation.push({
          x: new Date(item.year, 0),
          y: item.deforestation,
        })
        carbonData.emission.degradation.push({
          x: new Date(item.year, 0),
          y: item.degradation,
        })
        carbonData.emission.fire.push({
          x: new Date(item.year, 0),
          y: item.fire,
        })
      })
    })

  await axios
    .get(`https://api.dev.ctre.es/removals?level=0&id=${id}`)
    .then((res) => {
      res.data.map((item) => {
        carbonData.removal.total.push({
          x: new Date(item.year, 0),
          y: item.total,
        })
        carbonData.removal.forest.push({
          x: new Date(item.year, 0),
          y: item.forest,
        })
        carbonData.removal.nonforest.push({
          x: new Date(item.year, 0),
          y: item.nonforest,
        })
      })
    })

  const option1 = {
    animationEnabled: true,
    colorSet: 'colorSet1',
    height: 320,
    exportEnabled: true,
    axisX: {
      interval: 10,
      intervalType: 'year',
    },
    data: [
      {
        type: 'line',
        name: 'Total Carbon',
        xValueFormatString: 'YYYY',
        dataPoints: carbonData?.stock?.total,
      },
      {
        type: 'line',
        name: 'Carbon in forest areas',
        xValueFormatString: 'YYYY',
        dataPoints: carbonData?.stock?.forest,
      },
      {
        type: 'line',
        name: 'Carbon in nonforest areas',
        xValueFormatString: 'YYYY',
        dataPoints: carbonData?.stock?.nonforest,
      },
    ],
    slider: {
      minimum: new Date('2001-01-01'),
      maximum: new Date('2022-01-01'),
    },
  }

  const option2 = {
    animationEnabled: true,
    colorSet: 'colorSet2',
    height: 300,
    axisX: {
      interval: 10,
      intervalType: 'year',
    },
    data: [
      {
        type: 'line',
        name: 'Deforestaion Emissions',
        xValueFormatString: 'YYYY',
        dataPoints: carbonData?.emission?.deforestation,
      },
      {
        type: 'line',
        name: 'Degradation Emissions',
        xValueFormatString: 'YYYY',
        dataPoints: carbonData?.emission?.degradation,
      },
      {
        type: 'line',
        name: 'Fire Emissions',
        xValueFormatString: 'YYYY',
        dataPoints: carbonData?.emission?.fire,
      },
    ],
    slider: {
      minimum: new Date('2001-01-01'),
      maximum: new Date('2022-01-01'),
    },
  }

  const option3 = {
    animationEnabled: true,
    colorSet: 'colorSet3',
    height: 300,
    axisX: {
      interval: 2,
      intervalType: 'year',
    },
    data: [
      {
        type: 'line',
        name: 'Total Carbon Removal',
        xValueFormatString: 'YYYY',
        dataPoints: carbonData?.removal?.total,
      },
      {
        type: 'line',
        name: 'Forest Removal',
        xValueFormatString: 'YYYY',
        dataPoints: carbonData?.removal?.forest,
      },
      {
        type: 'line',
        name: 'Nonforest Removal',
        xValueFormatString: 'YYYY',
        dataPoints: carbonData?.removal?.nonforest,
      },
    ],
  }

  const data = [option1, option2, option3]

  return data
}

function convertChartDataToCSV(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data

  data = args.data || null
  if (data == null || !data.length) {
    return null
  }

  columnDelimiter = args.columnDelimiter || ','
  lineDelimiter = args.lineDelimiter || '\n'

  keys = Object.keys(data[0])

  result = ''
  result += keys.join(columnDelimiter)
  result += lineDelimiter

  data.forEach(function (item) {
    ctr = 0
    keys.forEach(function (key) {
      if (ctr > 0) result += columnDelimiter
      result += item[key]
      ctr++
    })
    result += lineDelimiter
  })
  return result
}

export function downloadCSV(args) {
  var data, filename, link
  var csv = ''
  for (var i = 0; i < args.chart.options.data.length; i++) {
    csv += convertChartDataToCSV({
      data: args.chart.options.data[i].dataPoints,
    })
  }
  if (csv == null) return

  filename = args.filename || 'chart-data.csv'

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
