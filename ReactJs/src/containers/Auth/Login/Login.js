import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import { Link } from "react-router-dom";
import "./Login.scss";
import { handleLoginApi } from "../../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassWord: false,
      errMessage: "",
    };
  }
  handleOnChangeName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassWord = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        if (!this.validateEmail(this.state.username)) {
          this.setState({
            errMessage: "Invalid email format",
          });
          return;
        }
        if (!this.validatePassword(this.state.password)) {
          this.setState({
            errMessage: "Password must be between 8 and 12 characters",
          });
          return;
        }
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  // Hàm kiểm tra độ dài mật khẩu
  validatePassword = (password) => {
    return password.length >= 8 && password.length <= 12;
  };
  // Hàm kiểm tra định dạng email
  validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  hendleShowHidePassword = () => {
    this.setState({
      isShowPassWord: !this.state.isShowPassWord,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    //JSX
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="row login-content">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input ">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeName(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password </label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={this.state.isShowPassWord ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(event) => this.handleOnChangePassWord(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.hendleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassWord
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 error-message">{this.state.errMessage}</div>
            <div className="col-12">
              <button
                className="btn-login mt-3"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12 mt-2">
              <span className="forgot-password">No account ?</span>
              <Link className="sign-up" to="/sign-up">
                SignUp now
              </Link>
            </div>
            <div className="col-12 text-center mt-5">
              <span className="text-other-login">Or Login with : </span>
            </div>
            <dir className="col-12 social-login">
              <a href="#!">
                <i className="fab fa-google-plus-g google"></i>
              </a>
              <a href="#!">
                <i className="fab fa-facebook-f facebook"></i>
              </a>
            </dir>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    //userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
