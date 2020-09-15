import React from 'react';
import { Route, Switch, withRouter,Redirect } from 'react-router-dom';
import Apexcharts from './Components/UI/Apexcharts/index';
import './App.css';
import Financialhightlights from './Components/UI/financial-highlights/index'
import Signup from './Components/Signup/signup';
import Signin from './Components/Signin/signin';
import Header from './Components/UI/Header/index';
import Paginationapp from './Components/UI/financial-highlights/PaginatioApp/PaginationApp';
import SignupSuccess from './Components/UI/SignupSuccess/Signupsuccess';
import Thankyou from './Components/UI/ThankYou';

function App() {

  let route = (
    <Switch>
      <Route path="/reactApexcharts" component={Apexcharts} />
      <Route path="/pagination" component={Paginationapp} />
      <Route path="/Financialhightlights" component={Financialhightlights} />
      <Route path="/login" component={Signin} />
      <Route path="/signupsuccess" component={SignupSuccess} />
      <Route path="/header" component={Header} />
      <Route path="/thankyou" component={Thankyou} />
      <Route path="/" exact component={Signup} />
      <Redirect to='/' />
    </Switch>
);

  return (
    <div className="App">
      {route}
    </div>
  );
}

export default withRouter(App);
