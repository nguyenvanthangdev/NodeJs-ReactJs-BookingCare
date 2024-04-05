import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import _ from "lodash";
import { withRouter } from "react-router";
import img from "../../assets/icon/user.png";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
      dropdownOpen: false,
    };
  }
  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      } else if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      } else {
        this.props.history.push(`/home`);
        return;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  goToLogOut = () => {
    let { processLogout } = this.props;
    if (this.props.history) {
      this.props.history.push(`/login`);
      processLogout();
    }
  };
  gotoHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    const { dropdownOpen } = this.state;
    const { userInfo, language, isLoggedIn } = this.props;
    let imageBase64 = "";
    if (isLoggedIn === true && userInfo && userInfo.image.data.length > 0) {
      imageBase64 = new Buffer.from(userInfo.image, "base64").toString(
        "binary"
      );
    } else {
      imageBase64 = img;
    }
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="oheader-tabs-container">
          <nav className="navbar navbar-light bg-light mx-3">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button">
                <i className="navbar-toggler-icon"></i>
              </button>
            </div>
          </nav>
          <Navigator menus={this.state.menuApp} />
        </div>
        {/* nút logout */}
        <form className="d-flex">
          <input
            className="form-control me-2 my-3"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light mx-3 px-4">Search</button>
          <div className="languages">
            <span
              className={
                language === LANGUAGES.VI ? "language-vi active" : "language-vi"
              }
              onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
            >
              VN
            </span>
            <span
              className={
                language === LANGUAGES.EN ? "language-en active" : "language-en"
              }
              onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
            >
              EN
            </span>
          </div>
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
                <DropdownItem className="custom-name">
                  Xin Chào{" "}
                  {userInfo && userInfo.firstName ? userInfo.firstName : " "}
                </DropdownItem>
                <DropdownItem
                  className="custom-home"
                  onClick={() => this.gotoHome()}
                >
                  Home
                </DropdownItem>
                <DropdownItem
                  className="custom-logout"
                  onClick={() => this.goToLogOut()}
                >
                  <span>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </form>
      </div>
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
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
