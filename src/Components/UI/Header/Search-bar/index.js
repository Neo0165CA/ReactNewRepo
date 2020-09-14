import React, { useState, useEffect, useRef } from "react";
import { withRouter, Redirect, NavLink} from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import "./index.modules.scss";


const SearchBar = props => {

    const [tickerList, setTickerList] = useState([]);
    const [count, setCount] = useState(0);
    const [input, setInput] = useState("");
    const [showList, setShowList] = useState(false);
    const myRef = useRef(null);
    let query = "";

    
    const searchTickers = async value => {
        query = value;
        if (value.length > 0) {
          const searchResponse = await axios.get(
            `http://ec2-3-84-165-185.compute-1.amazonaws.com:8080/SpringJDBCApp-0.0.1-SNAPSHOT/stocks/allstocks?value=${query}&value1=${query}`
          );
          console.log("resonse", searchResponse.data)
          setTickerList(searchResponse.data);
          
          setShowList(true);
          setCount(0);
          if (!_.isEmpty(searchResponse.data)) {
              myRef["current"].scrollTo(0, 0);
            }
        } else {
            setTickerList([]);
        }
        setInput(value);
        
    };

    const handleKeyDown = ()=>{
      console.log("keyDown")
    }

    useEffect(() =>{
      window.addEventListener("keydown", handleKeyDown);
      return ()=> {
          window.removeEventListener("keydown", handleKeyDown)
      }
    })
    
    // console.log("tickerList??", tickerList)
    const delayedGetList = _.debounce(searchTickers, 500);

    return (
        <div className={`mr-auto ${props.className} mainSearchWrapper`}>
          <form
            className="w-mob-100"
          >
            <div className=" searchWrapper">
              {!props.isHomeSearch && (
                <div className="search-icon">
                  <img
                    className="serchImg"
                    src="/images/search-icon.svg"
                    alt="search"
                  />
                </div>
              )}
              <input
                className="form-control searchInput"
                type="text"
                placeholder="Search Stocks or Companies"
                onChange={event => delayedGetList(event.target.value)}
                onClick={event => {
                  delayedGetList(event.target.value);
                }}
              />
              {props.isHomeSearch && (
                <button className="search-btn btn">Search</button>
              )}
            </div>


            <NavLink exact to="/Financialhightlights"> Financial hightlights </NavLink>
            <br/>
            <NavLink exact to="/reactApexcharts"> react-apexcharts </NavLink>
            <NavLink exact to="/login"> Sign in to your account! </NavLink>
            <br />
            <NavLink exact to="/pagination"> Pagination demo </NavLink>
            <br/>
            {/* <Link to="/Financialhightlights" component={Financialhightlights} /> */}
    


            <div className="search-list">
          {!_.isEmpty(tickerList) ? (
            <ul className="search-ticker" ref={myRef}>
              {
                  tickerList.length
                ? tickerList.map((item, index) => (
                    <li
                      className={`search-link ${
                        count === index ? "active" : ""
                      }`}
                      key={index}
                      value={item.ticker}
                    >
                    <NavLink exact to={`/stockpage/${item.name}/${item.ticker}/${item.cik}`}>{item.name} ({item.ticker})</NavLink>
               
                    </li>
                  ))
                : null}
            </ul>
          ) : showList && input.length > 0 && _.isEmpty(tickerList) ? (
            <div className="search-response">
              {`Oops there are no result for term "${input}"`}
            </div>
          ) : (
            <div />
          )}
        </div>



            
          </form>
        </div>
      );


}


export default withRouter(SearchBar);

