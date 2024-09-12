import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { ReactComponent as DownArrowIcon } from "../assets/down-arrow.svg";
import { ReactComponent as PieIcon1 } from "../assets/pie piece 1.svg";
import { ReactComponent as PieIcon2 } from "../assets/pie piece 2.svg";
import { ReactComponent as TrendChart } from "../assets/trendchart.svg";
import { DateRangePicker } from "rsuite";

import Picker from "react-month-picker";
import AliceCarousel from "react-alice-carousel";
import { CanvasJS, CanvasJSChart } from "canvasjs-react-charts";
import moment from "moment";
import { downloadTable, pushEIAData } from "../utils/oil";
import axios from "axios";
import { API_URL } from "../utils/auth";

const Crude = () => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState({});

  const [range, setRange] = useState([new Date("2022-04-01"), new Date()]);

  const [rangeValue, setRangeValue] = useState({
    from: { year: 2022, month: 8 },
    to: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
  });

  const [EIAData, setEIAData] = useState([]);
  const [ForthData, setForthData] = useState([]);

  const chartRef = useRef();

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const EIA_API_KEY = "M1TKk38zIbimr79GC7ZYRGk9Ermw1p2fuMkF8uER";
  CanvasJS.addColorSet("customColorSet", ["#32386442", "#01F1E3", "#991CFA"]);

  const makeDate = (m) => {
    if (m && m.year && m.month) return m.year + "-" + months[m.month - 1];
  };
  const pushEIAData = async () => {
    await fetch(
      `https://api.eia.gov/v2/petroleum/sum/sndw/data/?frequency=weekly&data[0]=value&facets[process][]=SAE&facets[process][]=SAS&facets[process][]=SAX&facets[duoarea][]=NUS&facets[product][]=EPC0&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=3&api_key=${EIA_API_KEY}`
    )
      .then((response) => response.json())
      .then((res) => {
        const data = [];
        const resdata = res.response.data;
        resdata.map((item) => {
          const date = moment(new Date(item.period + " 23:59:59")).format(
            "YYYY-MM-DD"
          );
          if (date !== data[0]?.date) {
            data.unshift({
              date: date,
              SAS: 0,
              SAX: 0,
              SAE: 0,
            });
            data[0][item.process] += item.value;
          } else {
            data[0][item.process] += item.value;
          }
        });
        console.log("data", data);
        data.map((item) => {
          axios.post(API_URL + "eia/", item);
        });
      });
  };

  useEffect(() => {
    pushEIAData();
  }, []);

  const Production = async () => {
    const data = [];
    const data1 = [];
    const data2 = [];

    await fetch(
      API_URL +
        `eia/?start=${moment(
          new Date(makeDate(rangeValue.from) + "-01")
        ).format("YYYY-MM-DD")}&end=${moment(
          new Date(makeDate(rangeValue.to) + "-31")
        ).format("YYYY-MM-DD")}`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("data", res);
        const resdata = res.data.sort(
          (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
        resdata.map((item, i) => {
          data.unshift({
            x: new Date(item.date + " 23:59:59"),
            y: item.SAE / 1000,
          });
          data1.unshift({
            x: new Date(item.date + " 23:59:59"),
            y: undefined,
          });
        });
      });
    await fetch(
      API_URL +
        `crude/?start=${moment(
          new Date(makeDate(rangeValue.from) + "-01")
        ).format("YYYY-MM-DD")}&end=${moment(
          new Date(makeDate(rangeValue.to) + "-31")
        ).format("YYYY-MM-DD")}`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("ForthGrid", res.data);
        res.data.map((item, i) => {
          data2.unshift({
            x: new Date(item.date + " 23:59:59"),
            y: item.SAE / 1000,
          });
        });
      })

      .then(() => {
        if (loading) {
          setEIAData(data);
          setForthData(data2);
        }
        data2.forEach((item) => {
          item.x = new Date(item.x).setDate(new Date(item.x).getDate() + 4);
        });
        const options = {
          animationEnabled: true,
          backgroundColor: "#0D0D10",
          colorSet: "customColorSet",
          height: 320,
          title: {
            text: "ForthGrid Production vs EIA Production",
            fontFamily: "Open Sans",
            fontColor: "#FFFFFF",
            fontSize: 20,
            fontWeight: 400,
            horizontalAlign: "left",
            padding: {
              top: 20,
              bottom: 10,
            },
          },
          axisX: {
            valueFormatString: "MMM DD",
            labelFontColor: "#6A6A9F",
            labelTextAlign: "center",
            // interval: 1,
            intervalType: "week",
          },
          axisY: {
            // maximum: 1050000,
            labelFontColor: "#6A6A9F",
            includeZero: false,
          },
          legend: {
            horizontalAlign: "left",
            verticalAlign: "top",
            fontSize: 14,
            fontWeight: 400,
            fontColor: "#9F9FDA",
            fontFamily: "Open Sans",
            cursor: "pointer",
            itemWrap: false,
          },
          toolTip: {
            shared: true,
            contentFormatter: function (e) {
              var str = `<div style="padding: 3px; color: #05050f">`;
              str += moment(e.entries[0]?.dataPoint.x).format("MMM DD,YYYY");
              if (e.entries[1]?.dataPoint.y) {
                str += `<br/><span style="color: #01F1E3;">EIA: </span><span>${e.entries[1]?.dataPoint.y}</span>`;
              } else {
                str += `<br/><span style="color: #991CFA;">ForthGrid: </span><span>${e.entries[0]?.dataPoint.y}</span>`;
              }
              str += "</div>";
              return str;
            },
          },
          data: [
            {
              type: "column",
              dataPoints: data1,
            },
            {
              type: "spline",
              xValueFormatString: "MMM YYYY",
              showInLegend: true,
              name: "EIA",
              dataPoints: data,
            },
            {
              type: "spline",
              xValueFormatString: "MMM YYYY",
              showInLegend: true,
              name: "ForthGrid",
              dataPoints: data2,
            },
          ],
        };
        console.log("option", options);
        setOptions(options);
      })

      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    Production();
  }, [rangeValue]);

  const download = () => {
    downloadTable();
  };

  const pickerLang = {
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    from: "From",
    to: "To",
  };
  const makeText = (m) => {
    if (m && m.year && m.month)
      return pickerLang.months[m.month - 1] + ". " + m.year;
    return "?";
  };

  const EIA = (date) => {
    const eia = EIAData.filter(
      (item) =>
        moment(new Date(item.x).setDate(new Date(item.x).getDate() + 4)).format(
          "YYYY-MM-DD"
        ) == moment(date).format("YYYY-MM-DD")
    );
    console.log("data", eia);
    if (eia[0]?.y) {
      return eia[0]?.y;
    } else {
      return "N/A";
    }
  };

  const Correlation = (date) => {
    console.log("eia", EIAData);
    const eia = EIAData.filter((item) => moment(item.x) <= moment(date));
    const forth = ForthData.filter((item) => moment(item.x) <= moment(date));
    console.log("eia", eia);
    console.log("forth", forth);
    if (EIA(date) != "N/A") {
      let corr = 0;
      let num = 0;
      for (let i = 0; i < 52; i++) {
        if (forth[i]?.y) {
          corr += Math.log(forth[i]?.y / eia[i]?.y);
          num++;
        }
      }
      return (100 * Math.exp(-Math.abs(corr / num))).toFixed(2);
    } else {
      return "N/A";
    }
  };

  const pickerRef = useRef();

  const showPicker = () => {
    console.log("picker", "show");
    pickerRef.current.show();
  };

  const MonthBox = ({ value }) => {
    return (
      <div className="box" onClick={() => showPicker()}>
        {value}
      </div>
    );
  };

  const onChange = () => {};
  return (
    <div className="crude">
      <Navbar tab={3} />
      {/* <AliceCarousel autoPlay infinite autoPlayInterval="100" items={items} /> */}

      {!loading && (
        <div className="container">
          <div className="title">
            US Crude Oil Production
            <div className="icon">
              <DownArrowIcon />
            </div>
          </div>
          <div className="btn-group">
            {/* <div className="btn filter">Filter</div> */}
            <div className="btn download" onClick={() => download()}>
              Download
            </div>
          </div>
          <div className="picker-area">
            <Picker
              value={rangeValue}
              lang={pickerLang}
              theme="dark"
              onChange={onChange}
              onDismiss={setRangeValue}
              ref={pickerRef}
            >
              <MonthBox
                value={`${makeText(rangeValue.from)}-${makeText(
                  rangeValue.to
                )}`}
                onClick={() => showPicker()}
              />
            </Picker>
          </div>

          <div className="crude-chart">
            <CanvasJSChart options={options} ref={chartRef} />
          </div>
          <div className="subtitle">Overall figures</div>
          <div className="figures">
            <div className="summary figure">
              <div className="figure-title">Summary</div>
              <div className="table">
                <div className="head">
                  <div className="text2">ForthGrid</div>
                  <div className="text2">EIA</div>
                  <div className="text2">Date</div>
                  <div>Correlation</div>
                </div>
                <div className="list">
                  <div className="text">{ForthData[0]?.y}</div>
                  <div className="text">{EIA(ForthData[0]?.x)}</div>
                  <div className="text">
                    {moment(ForthData[0]?.x).format("MMM DD")}
                  </div>
                  <div className="text">{Correlation(ForthData[0]?.x)}</div>
                </div>
                <div className="list">
                  <div className="text">{ForthData[1]?.y}</div>
                  <div className="text">{EIA(ForthData[1]?.x)}</div>
                  <div className="text">
                    {moment(ForthData[1]?.x).format("MMM DD")}
                  </div>
                  <div className="text">{Correlation(ForthData[1]?.x)}</div>
                </div>
                <div className="list">
                  <div className="text">{ForthData[2]?.y}</div>
                  <div className="text">{EIA(ForthData[2]?.x)}</div>
                  <div className="text">
                    {moment(ForthData[2]?.x).format("MMM DD")}
                  </div>
                  <div className="text">{Correlation(ForthData[2]?.x)}</div>
                </div>
                <div className="list">
                  <div className="text">{ForthData[3]?.y}</div>
                  <div className="text">{EIA(ForthData[3]?.x)}</div>
                  <div className="text">
                    {moment(ForthData[3]?.x).format("MMM DD")}
                  </div>
                  <div className="text">{Correlation(ForthData[3]?.x)}</div>
                </div>
              </div>
            </div>
            <div className="correlation figure">
              <div className="head">
                <div className="figure-title">Correlation</div>
                <div className="text">
                  Overall correlation between
                  <br /> ForthGrid and EIA
                </div>
              </div>
              <div className="chart">
                <div className="pie1">
                  <PieIcon1 />
                </div>
                <div className="pie2">
                  <PieIcon2 />
                </div>

                <div className="title">Summary</div>
                <div className="value">
                  {Correlation(ForthData[0]?.x) != "N/A"
                    ? Correlation(ForthData[0]?.x)
                    : Correlation(ForthData[1]?.x)}{" "}
                  %
                </div>
              </div>
            </div>
            {/* <div className="trend figure">
              <div className="trend-head">
                <div className="head">
                  <div className="figure-title">Trend</div>
                  <div className="text">Compare to 12% last year</div>
                </div>
                <div className="value">92,890</div>
              </div>
              <div className="chart">
                <TrendChart />
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Crude;
