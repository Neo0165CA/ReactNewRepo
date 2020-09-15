import React from 'react';
import {withRouter} from 'react-router-dom';
import "./index.modules.scss";
import Signupform from './SignUpForm/signupform';

const Signup = (props)=>{


    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if(expirationDate >= new Date()) props.history.push("/header");

    return(
        <Signupform />
    )
}


export default withRouter(Signup);
