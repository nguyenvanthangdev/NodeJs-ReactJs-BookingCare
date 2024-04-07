import React, { Component } from "react";
import { connect } from "react-redux";
//import { push } from "connected-react-router";
//import * as actions from "../../store/actions";
import { Link } from "react-router-dom";
import "./Signup.scss";
import { emitter } from "../../../utils/emitter";
import { createNewUserService } from "../../../services/userService";
import { toast } from "react-toastify";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      isShowPassWord: false,
      errMessage: "",
      confirmPassword: "",
      roleId: "R3",
      positionId: "P1",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        confirmPassword: "",
        lastName: "",
        firstName: "",
        roleId: "R3",
        positionId: "P1",
      });
    });
  }
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  hendleShowHidePassword = () => {
    this.setState({
      isShowPassWord: !this.state.isShowPassWord,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.warning("Missing parameter : " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode === 0) {
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
        toast.success("Create a new user succeed !");
      } else {
        toast.error(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSignUp = () => {
    this.setState({
      errMessage: "",
    });
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({
        errMessage: "Passwords do not match",
      });
      return;
    }
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api new a user
      this.createNewUser(this.state);
    }
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleSignUp();
    }
  };

  render() {
    //JSX
    console.log(this.state);
    return (
      <div className="signup-background">
        <div className="signup-container">
          <div className="row signup-content">
            <div className="col-12 text-signup">Sign Up</div>
            <div className="col-12 form-group signup-input ">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
              />
            </div>
            <div className="col-12 form-group signup-input ">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
              />
            </div>
            <div className="col-12 form-group signup-input ">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeInput(event, "email")}
              />
            </div>
            <div className="col-12 form-group signup-input">
              <label>Password</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={this.state.isShowPassWord ? "text" : "password"}
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
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
            <div className="col-12 form-group signup-input my-3">
              <label>Confirm password </label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={this.state.isShowPassWord ? "text" : "password"}
                  placeholder="Enter your password"
                  value={this.state.confirmPassword}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "confirmPassword")
                  }
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
            <div>
              <input
                hidden
                type="text"
                className="form-control"
                value={this.state.roleId}
                readOnly
              />
              <input
                type="text"
                className="form-control"
                value={this.state.positionId}
                hidden
                readOnly
              />
            </div>
            <div className="col-12 error-message">{this.state.errMessage}</div>
            <div className="col-12">
              <button
                className="btn-signup mt-3"
                onClick={() => this.handleSignUp()}
              >
                Sign Up
              </button>
            </div>
            <div className="col-12 mt-2">
              {/* <span className="forgot-password">Forgot your password ?</span> */}
              <Link className="sign-in" to="/login">
                Login ?
              </Link>
            </div>
            <div className="col-12 text-center mt-5">
              <span className="text-other-signup">Or Login with : </span>
            </div>
            <dir className="col-12 social-signup">
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
    // navigate: (path) => dispatch(push(path)),
    //userLoginFail: () => dispatch(actions.adminLoginFail()),
    // userLoginSuccess: (userInfo) =>
    //   dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
