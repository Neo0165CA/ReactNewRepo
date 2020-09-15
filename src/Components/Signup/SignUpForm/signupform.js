import React, { useState } from "react";
import { withRouter, NavLink } from "react-router-dom";
import "./index.modules.scss";
import axios from 'axios';
import md5 from 'md5';
import _ from "lodash";
import { url } from '../../Utility/config';
import { Errors, ErrorsValidate } from "../../Utility/constant";

const Signupform = (props) => {

  const [formData, setFormData] = useState("");
  const { fName, lName, email, password, emailErr, passwordErr, lNameErr, fNameErr } = formData;
  const [netError, setNetError] = useState("");

  const onSubmitHandler = async event => {
    event.preventDefault();
    try{
      const signupRequest = await axios.post(`${url}:8080/SpringJDBCApp-0.0.1-SNAPSHOT/stocks/signup`,
      {
        "first_name" : fName,
        "last_name" : lName,
        email,
        hashed_password : md5(password)
      }
      );
      if(signupRequest){
        console.log("signup successfully")
      }
  
    }catch(err){
      setNetError(err);
    }

    props.history.push("/header");
  };

  const inputHandleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value, [`${name}Err`]: "" });
  };

  const setFormErr = (name, type) => {
    setFormData({ ...formData, [`${name}Err`]: type ? Errors[type] : "" });
  };

  const handleInputBlur = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (_.isEmpty(value)) {
      setFormErr(name, "required");
    } else {
      switch (name) {
        case "fName":
          ErrorsValidate.namePattern.test(value)
            ? setFormErr(name, "")
            : setFormErr(name, "fName");
          break;
        case "lName":
          ErrorsValidate.namePattern.test(value)
            ? setFormErr(name, "")
            : setFormErr(name, "lName");
          break;
        case "email":
          ErrorsValidate.emailPattern.test(value)
            ? setFormErr(name, "")
            : setFormErr(name, "email");
          break;
        case "password":
          value.length < 8
            ? setFormErr(name, "password")
            : setFormErr(name, "");
          break;
        default:
          return null;
      }
    }
  };

  const linkedInclickHandler = (event) => {
    console.log("not available yet!");
  };

  return (
    <div className="login-space">
      <div className="login-form sign-up mx-auto">
        <div className="card border-secondary">
          <div className="card-header">
            <h3 className="login-tit">
              <span> Sign Up </span>
            </h3>
          </div>
          <div className="card-body login-main-cont">
            <p className="rcmt-txt"> Recommended! </p>
            <div className="form-group">
              <button
                className="btn linkedin-btn"
                onClick={linkedInclickHandler}
              >
                <img
                  src="/images/logo-linkedin.svg"
                  className="linkedin-icon"
                  alt="linkedin"
                />
                <img
                  src="/images/logo-linkedin-blue.svg"
                  className="linkedin-icon-blue"
                  alt="linkedin"
                />
                <span className="font-weight-bold">Sign up with LinkedIn</span>
              </button>
            </div>
            <form className="form signup-form-cont">
              <hr className="divided" />
              <p className="rcmt-txt"> Don’t have a LinkedIn? </p>

              <div className="form-group">
                <input
                  type="text"
                  name="fName"
                  className="input-bx wth"
                  onChange={inputHandleChange}
                  onBlur={handleInputBlur}
                  id="inputFname3"
                  placeholder="First Name"
                  required=""
                />
                <div className="errorMsg">{fNameErr}</div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lName"
                  className="input-bx wth"
                  onChange={inputHandleChange}
                  onBlur={handleInputBlur}
                  id="inputLName3"
                  placeholder="Last Name"
                  required=""
                />
                <div className="errorMsg"> {lNameErr} </div>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="input-bx wth"
                  onChange={inputHandleChange}
                  onBlur={handleInputBlur}
                  id="inputEmail"
                  placeholder="Email"
                  required=""
                />
                <div className="errorMsg">{emailErr}</div>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="input-bx wth"
                  id="inputPassword"
                  onChange={inputHandleChange}
                  onBlur={handleInputBlur}
                  placeholder="Password"
                  required=""
                />
                <div className="errorMsg">{passwordErr}</div>
                <div className="errorMsg-exist">{netError}</div>
              </div>
              <div className="form-group">
                <button
                  type="button"
                  onClick={onSubmitHandler}
                  className="btn login-btn font-weight-bold"
                >
                  Sign Up
                </button>
              </div>
              <p className="botm-cont ml-3">
                Already have an account?{" "}
                <NavLink exact to="/login">
                  {" "}
                  Sign in to your account!{" "}
                </NavLink>
              </p>
              <hr className="divided did2" />
              <p className="botm-cont botm-cont-2 text-center">
                By signing up you agree to the{" "}
                <a href="javscript:void(0);" className="a-link">
                  Terms of Service
                </a>{" "}
                and
                <a href="javscript:void(0);" className="a-link">
                  {" "}
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Signupform);
