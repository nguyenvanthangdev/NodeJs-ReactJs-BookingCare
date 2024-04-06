import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, USER_ROLE } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import img from "../../../assets/icon/user.png";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }
  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  goToLogOut = () => {
    let { processLogout } = this.props;
    if (this.props.history) {
      this.props.history.push(`/login`);
      processLogout();
    }
  };
  goToLogIn = () => {
    if (this.props.history) {
      this.props.history.push(`/login`);
    }
  };
  gotoAdmin = () => {
    const { userInfo } = this.props;
    if (userInfo && userInfo.roleId === USER_ROLE.ADMIN) {
      if (this.props.history) {
        this.props.history.push(`/system/user-redux`);
      }
    }
    if (userInfo && userInfo.roleId === USER_ROLE.DOCTOR) {
      if (this.props.history) {
        this.props.history.push(`/doctor/manage-schedule`);
      }
    }
  };
  handleViewAccount = () => {
    const { userInfo } = this.props;
    if (this.props.history) {
      this.props.history.push(`/account/${userInfo.id}`);
    }
  };
  render() {
    //let language = this.props.language;
    const { dropdownOpen } = this.state;
    const { userInfo, language, isLoggedIn } = this.props;
    console.log(this.props);
    let imageBase64 = "";
    if (
      isLoggedIn === true &&
      userInfo &&
      userInfo.image &&
      userInfo.image.data &&
      userInfo.image.data.length > 0
    ) {
      imageBase64 = new Buffer.from(userInfo.image, "base64").toString(
        "binary"
      );
    } else if (isLoggedIn === true && userInfo && userInfo.image === null) {
      imageBase64 = img;
    } else {
      imageBase64 = img;
    }

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <nav className="navbar navbar-light bg-light mx-3">
                <div className="container-fluid">
                  <button className="navbar-toggler" type="button">
                    <i className="navbar-toggler-icon"></i>
                  </button>
                </div>
              </nav>
              <div
                className="header-logo mx-3"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.search-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="sopport">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="home-header.sopport" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
              {/* acount */}
              <div className="dropdown-custom">
                <Dropdown
                  className=""
                  isOpen={dropdownOpen}
                  toggle={this.toggleDropdown}
                >
                  <DropdownToggle
                    caret
                    className="btn-light dropdown-custom-title"
                    style={{
                      backgroundImage: `url(${
                        isLoggedIn === true && userInfo ? imageBase64 : img
                      })`,
                    }}
                  ></DropdownToggle>
                  <DropdownMenu right>
                    {isLoggedIn === true ? (
                      <>
                        <DropdownItem onClick={() => this.handleViewAccount()}>
                          Thông tin tài khoản
                        </DropdownItem>
                        {(userInfo && userInfo.roleId === USER_ROLE.DOCTOR) ||
                        (userInfo && userInfo.roleId === USER_ROLE.ADMIN) ? (
                          <DropdownItem onClick={() => this.gotoAdmin()}>
                            Admin
                          </DropdownItem>
                        ) : (
                          <>
                            <DropdownItem>Lịch sử dặt lịch</DropdownItem>
                          </>
                        )}
                        <DropdownItem
                          className="custom-logout"
                          onClick={() => this.goToLogOut()}
                        >
                          <span>
                            <i className="fas fa-sign-out-alt"></i>
                            Logout
                          </span>
                        </DropdownItem>
                      </>
                    ) : (
                      <DropdownItem
                        className="custom-logout"
                        onClick={() => this.goToLogIn()}
                      >
                        <span>
                          <i className="fas fa-sign-out-alt"></i>
                          Login
                        </span>
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm" />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child-1">
                  <div className="icon-child"></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child-2">
                  <div className="icon-child"></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child-3">
                  <div className="icon-child"></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child-4">
                  <div className="icon-child"></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child-5">
                  <div className="icon-child"></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child-6">
                  <div className="icon-child"></div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
