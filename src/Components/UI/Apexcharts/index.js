import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";
import "./index.modules.scss";
import { NAV_PILL_BUTTON } from '../../Utility/constant';
import { url } from '../../Utility/config';

const CashFlowChart = props => {
  const [cashFlowData, setCashFlowData] = useState([]);
  const [index, setIndex] = useState(1);
  const [toolData, setToolData] = useState("Operating Activities");
  let tickerParam = "AAPL";

  const fetchIncomeData = async () => {
    let tag;
    if (index === 1) {
      tag = "netcashfromoperatingactivities";
    }
    if (index === 2) {
      tag = "netcashfromfinancingactivities";
    }
    if (index === 3) {
      tag = "netcashfrominvestingactivities";
    }
    if (index === 4) {
      tag = "freecashflow";
    }
    const responseCashChart = await axios.get(
      `${url}:8080/SpringJDBCApp-0.0.1-SNAPSHOT/stocks/cashflowgraph?ticker=${tickerParam}`
    );
    const cashChartResponse = responseCashChart.data.reverse();
    const uiCashChartData = cashChartResponse.map(item => {
      return {
        x: new Date(item.fiscal_year.toString()),
        y: item[`${tag}`]
      };
    });
    if (index === 4) {
      try {
        const responseForecast = await axios.get(
          `${url}/revenue/forecast/ticker=${tickerParam}`
        );
        let cashChartInfo= typeof(responseForecast.data) === "string" ? JSON.parse(responseForecast.data.replace(/NaN/g, 0)) : responseForecast.data
        const uiFutureData = [
          {
            x: new Date(
              (
                cashChartResponse[cashChartResponse.length - 1]
                  .fiscal_year + 1
              ).toString()
            ),
            y: cashChartInfo[`free_cash_flow_0_yrs`]
          },
          {
            x: new Date(
              (
                cashChartResponse[cashChartResponse.length - 1]
                  .fiscal_year + 2
              ).toString()
            ),
            y: cashChartInfo[`free_cash_flow_1_yrs`]
          },
          {
            x: new Date(
              (
                cashChartResponse[cashChartResponse.length - 1]
                  .fiscal_year + 3
              ).toString()
            ),
            y: cashChartInfo[`free_cash_flow_2_yrs`]
          }
        ];
        let newData = uiCashChartData.concat(uiFutureData);
        setCashFlowData(newData);
      } catch (err) {
        setCashFlowData(uiCashChartData);
      }
    } else {
      setCashFlowData(uiCashChartData);
    }
  };

  useEffect(() => {
    fetchIncomeData();
  });

  const incomeObj = {
    1: "netcashfromoperatingactivities",
    2: "netcashfromfinancingactivities",
    3: "netcashfrominvestingactivities",
    4: "freecashflow",
  };

  const updatedIncomeChart = index =>{
    setIndex(index);
    setToolData(incomeObj[index])
  }

  const handleIncomeChart = async event => {
    const { name } = event.target;
    switch (name) {
      case "ncffa":
        return updatedIncomeChart(2);
      case "ncfia":
        return updatedIncomeChart(3);
      case "fcf":
        return updatedIncomeChart(4);
      default:
        return updatedIncomeChart(1);
    }
  };
  const seriesCashFlow = [
    {
      name: toolData,
      data: cashFlowData
    }
  ];
  const options = {
    chart: {
      height: 150,
      width: "100%",
      type: "line",
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight",
      width: 3
    },
    grid: {
      show: false,
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    colors: ["#2f60ff"],
    xaxis: {
      type: "datetime",
      lines: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: true,
        style: {
          colors: "#2f60ff",
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label"
        }
      }
    },
    yaxis: {
      lines: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: true,
        formatter: value => {
          return parseInt(value / 1000000).toLocaleString() + "M";
        },
        style: {
          colors: "#2f60ff",
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label"
        }
      }
    },
    annotations: {
      xaxis: [
        {
          x:
            index === 4
              ? new Date((new Date().getUTCFullYear() - 1).toString()).getTime()
              : undefined,
          borderColor: "#c4c4c4f",
          borderWidth: 1,
          strokeDashArray: 0,
          label: {
            borderColor: "#ffffff",
            orientation: "horizontal",
            offsetX: -30,
            offsetY: 20,
            style: {
              color: "#525660",
              background: "#ffffff",
              fontSize: "14px",
              fontWeight: 600
            },
            text: `Past`
          }
        },
        {
          x:
            index === 4
              ? new Date((new Date().getUTCFullYear() - 1).toString()).getTime()
              : undefined,
          borderColor: "#c4c4c4",
          borderWidth: 1,
          strokeDashArray: 0,
          label: {
            borderColor: "#ffffff",
            orientation: "horizontal",
            offsetX: 40,
            offsetY: 20,
            style: {
              color: "#525660",
              background: "#ffffff",
              fontSize: "14px",
              fontWeight: 600
            },
            text: `Forecast`
          }
        }
      ]
    }
  };
  return (
    <div className="cashFlowChartWrapper">
      <div className="cashFlowChart">
        <Chart
          series={seriesCashFlow}
          options={options}
          height={250}
          type="line"
        />
        <div className="pill-nav text-center">
          {NAV_PILL_BUTTON.map(item => {
            return (
              <button
                className={`pill-nav-button ${
                  index === item.id ? "active" : ""
                }`}
                name={item.name}
                onClick={handleIncomeChart}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

CashFlowChart.propTypes = {};

export default withRouter(CashFlowChart);
