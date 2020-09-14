import React, { useState, useEffect, useMemo } from 'react';
import _ from "lodash";
import axios from 'axios';
import FinancialTable from './Table/index'
import { withRouter } from "react-router-dom";

const FinancialHighLights = ()=>{

    const [financialHighlightsData, setFinancialHighlights] = useState([]);
    const [columnInfo, setColumninfo] = useState([]);
    const [dataErr, setDataErr] = useState(false);

    let tickerParam = "AAPL";
    let cikParam = "320193";

    const fetchFinanicalHighlights = async () =>{
        let highlightsData = [];
        try{
            const highlightsResponse = await axios.get(
                `http://ec2-3-84-165-185.compute-1.amazonaws.com:8080/SpringJDBCApp-0.0.1-SNAPSHOT/stocks/analysisData?ticker=${tickerParam}`
              );
              if (!_.isEmpty(highlightsResponse.data)) {
                highlightsData = highlightsResponse.data.reverse();
              }
              else{
                setDataErr(true)
              }

              
        }catch (err){

            setDataErr(true)

        }

        const getFinancialData = (name) =>{
            return highlightsData.map((item, index) =>{
              let data = Math.round(item[`${name}`]);
              return { [`value${[index]}`] : data }
            })
        }
      
        const columns = highlightsData.map((item, index)=> {

          return  {
            Header: `${item.end_date.slice(0,7)}`,
            columns :[
              {
                accessor: `value${[index]}`,
              }
            ]
           
          }

        })
        const arrkeys = [];
        const datanew = highlightsData.map((item, index) =>{
          
          for (let key in item){
            if(arrkeys.indexOf(key) == -1){
              arrkeys.push(key);
            }
            
          }
          
        })

        
        const dataOne = [];
        for(var i = 0; i< arrkeys.length; i++){

          if (  arrkeys[i] == "primary_security_ticker" ||  arrkeys[i] == "fiscal_period"|| arrkeys[i] == "end_date" || arrkeys[i] == "start_date" ) continue;

          dataOne.push(Object.assign({}, {id : `${arrkeys[i]}`},...getFinancialData(arrkeys[i])));
        }

        setFinancialHighlights(dataOne);
        setColumninfo(columns);
      }

    useEffect(() => {
      fetchFinanicalHighlights();
      },[tickerParam, cikParam]);

return (
  <div className="container finacialHighlightsWrapper">
    <div className="row">
      <div className="col-12">
        <h3 className="heading"> Financial Statements </h3>
        <p className="parg">
          A stock’s stabiliity refers to how well a stock will do over a certain pereiod of time loreeem ipsum.
        </p>
      </div>
      <div className="col-12 tble-responsive">
        <div className="financial-highlights">
          <h2> Financial Highlights </h2>
          {dataErr === false ? <div className="table-responsive">
            <FinancialTable columns={columnInfo} data={financialHighlightsData}></FinancialTable>
          </div> : <div className="nodata">data not available</div>
          }
        </div>
      </div>
    </div>
  </div>
);

}

export default withRouter(FinancialHighLights);

