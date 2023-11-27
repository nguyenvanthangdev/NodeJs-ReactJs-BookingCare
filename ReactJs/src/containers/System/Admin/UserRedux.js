import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],

      previewImgUrl: "",
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      role: "",
      position: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: "",
        role: "",
        position: "",
        avatar: "",
      });
    }
  }
  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: file,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = (event) => {
    event.preventDefault(); // Ngăn chặn gửi form mặc định
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phonenumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required : " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;

    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      // gender,
      // role,
      // position,
      // avatar,
    } = this.state;
    console.log("check", this.state);
    return (
      <React.Fragment>
        <div className="title my-5">Manage Users</div>
        <div className="user-redux-container">
          <div className="user-redux-body container-left">
            <div className="container">
              <div className="row">
                <form>
                  <div className="fs-4 my-3 mx-2 text-center">
                    <FormattedMessage id="manage-user.add" />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>
                        <FormattedMessage id="manage-user.email" />
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => {
                          this.onChangeInput(event, "email");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>
                        <FormattedMessage id="manage-user.password" />
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                          this.onChangeInput(event, "password");
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>
                        <FormattedMessage id="manage-user.first-name" />
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(event) => {
                          this.onChangeInput(event, "firstName");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>
                        <FormattedMessage id="manage-user.last-name" />
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(event) => {
                          this.onChangeInput(event, "lastName");
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>
                        <FormattedMessage id="manage-user.phone-number" />
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(event) => {
                          this.onChangeInput(event, "phoneNumber");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>
                        <FormattedMessage id="manage-user.address" />
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={(event) => {
                          this.onChangeInput(event, "address");
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>
                        <FormattedMessage id="manage-user.gender" />
                      </label>
                      <select
                        className="form-select"
                        onChange={(event) => {
                          this.onChangeInput(event, "gender");
                        }}
                      >
                        {genders &&
                          genders.length > 0 &&
                          genders.map((item, index) => {
                            return (
                              <option key={index} value={item.key}>
                                {language === LANGUAGES.VI
                                  ? item.valueVi
                                  : item.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label>
                        <FormattedMessage id="manage-user.position" />
                      </label>
                      <select
                        className="form-select"
                        onChange={(event) => {
                          this.onChangeInput(event, "position");
                        }}
                      >
                        {positions &&
                          positions.length > 0 &&
                          positions.map((item, index) => {
                            return (
                              <option value={item.key} key={index}>
                                {language === LANGUAGES.VI
                                  ? item.valueVi
                                  : item.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>
                        <FormattedMessage id="manage-user.role" />
                      </label>
                      <select
                        className="form-select"
                        onChange={(event) => {
                          this.onChangeInput(event, "role");
                        }}
                      >
                        {roles &&
                          roles.length > 0 &&
                          roles.map((item, index) => {
                            return (
                              <option value={item.key} key={index}>
                                {language === LANGUAGES.VI
                                  ? item.valueVi
                                  : item.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label>
                        <FormattedMessage id="manage-user.img" />
                      </label>
                      <div className="preview-img-container">
                        <input
                          id="previewImg"
                          type="file"
                          hidden
                          onChange={(event) => this.handleOnChangeImage(event)}
                        />
                        <label htmlFor="previewImg" className="label-upload">
                          <div className="img"></div>
                        </label>
                        <div
                          className="preview-image mx-3"
                          style={{
                            backgroundImage: `url(${this.state.previewImgUrl})`,
                          }}
                          onClick={() => this.openPreviewImage()}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 my-3"
                    onClick={(event) => this.handleSaveUser(event)}
                  >
                    <FormattedMessage id="manage-user.save" />
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="container-right">
            <TableManageUser />
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,

    listUsers: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),

    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
