import React, {useState, useEffect} from 'react';
import Pagination from '../Pagination/index';
import axios from 'axios';
import styled from 'styled-components';
import _ from 'lodash';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

const Paginationapp = () => {

    const [errorLog, setErrorlog] = useState(false);
    const [columnsData, setColumnsdata] = useState([]);
    const [paginationData, setPagenationdata] = useState([]);


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
                setErrorlog(true)
              }
        }catch (err){

            setErrorlog(true)

        }
        const headerProps = [];
        const uiData = [];
        const existingArrElements = ["primary_security_ticker", "fiscal_period","end_date","start_date"];
        highlightsData.forEach((item, index) =>{
            for(let key in item){
                if(!existingArrElements.includes(key)){
                    if(!headerProps.includes(key))headerProps.push(key);
                }
            }
        })
        
        const FetchByPropName = (name) => {
            return highlightsData.map((item, index) =>{
                let dataVal = Math.round(item[name]);
                return { [`value${index}`]:  dataVal}
            })
        }

        const columns = highlightsData.map((item, index) => {
            return {
                Header: item.end_date.slice(0,7),
                columns: [
                  {
                    accessor: `value${[index]}`,
                  },
                ],
              }
        })
        
        for(var i =0; i < headerProps.length; i++){
            
            uiData.push(Object.assign({}, {id : `${headerProps[i]}`}, ...FetchByPropName(headerProps[i])));
        }
        

        setColumnsdata(columns);
        setPagenationdata(uiData);

        
    }


    useEffect(() => {
        fetchFinanicalHighlights();
        },[tickerParam, cikParam]);



    return(
        <Styles>
        <Pagination columns={columnsData} data={paginationData} />
        </Styles>
    )
}

export default Paginationapp;