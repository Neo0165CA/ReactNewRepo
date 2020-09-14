import React from 'react';
import {withRouter} from 'react-router-dom';
import "./index.modules.scss";
import Signupform from './SignUpForm/signupform';

const Signup = ()=>{
    return(
        <Signupform />
    )
}


export default withRouter(Signup);
