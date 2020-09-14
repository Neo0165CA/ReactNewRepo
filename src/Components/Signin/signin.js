import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import md5 from "md5";
import "./index.modules.scss";

const Signinform = (props) => {
  const [formData, setFormData] = useState("");
  const { emailErr, passwordErr } = formData;

  const ErrorsValidate = {
    namePattern: /^[a-zA-Z ]{4,30}$/,
    emailPattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  };

  const Errors = {
    email: "Please enter a valid email.",
    password: "At least 8 charecters.",
    required: "This value is required.",
  };

  const OnSubmitHandler = (event) => {
    event.preventDefault();



      const storedeEmail = localStorage.getItem('email');
      const storedPw = localStorage.getItem('password');

      if(formData.email === storedeEmail && formData.password === storedPw){
          props.history.push("/thankyou")
      }else{
          alert("User is not exist");
      }


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
    if (value.trim() === "") {
      setFormErr(name, "required");
    } else {
      switch (name) {
        case "email":
          ErrorsValidate.emailPattern.test(value)
            ? setFormErr(name, "")
            : setFormErr(name, "email");
          break;
        case "password":
          value.length < 8
            ? setFormErr(name, "password")
            : setFormErr(name, " ");
          break;
        default:
          break;
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
              <span> Sign In </span>
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
                <span className="font-weight-bold">Sign In with LinkedIn</span>
              </button>
            </div>
            <form className="form signup-form-cont">
              <hr className="divided" />
              <p className="rcmt-txt"> Don’t have a LinkedIn? </p>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="input-bx wth"
                  onChange={inputHandleChange}
                  onBlur={handleInputBlur}
                  id="inputEmail3"
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
                  id="inputPassword3"
                  onChange={inputHandleChange}
                  onBlur={handleInputBlur}
                  placeholder="Password"
                  required=""
                />
                <div className="errorMsg">{passwordErr}</div>
                {/* <div className="errorMsg-exist">{passwordErr}</div> */}
              </div>

              <div className="form-group">
                <button
                  type="button"
                  onClick={OnSubmitHandler}
                  className="btn login-btn font-weight-bold"
                >
                  Sign In
                </button>
              </div>
              <p className="botm-cont ml-3">
                <a href="/" className="a-link">
                  Forget Password
                </a>
              </p>
              <hr className="divided did2" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Signinform);
