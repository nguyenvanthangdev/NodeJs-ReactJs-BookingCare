import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/Home/HomeHeader";
import "./ManageAccount.scss";
import { editUserService, getAllUsers } from "../../../services/ApiService";
import { CommonUtils, LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
class ManageAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      previewImgUrl: "",
      image: "",
      gender: "",
      genderArr: [],
      id: "",
    };
  }
  async componentDidMount() {
    await this.getAllUsersFromReact();
    this.props.getGenderStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
      });
    }
  }
  getAllUsersFromReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllUsers(id);
      if (res && res.errCode === 0) {
        let data = res.users;
        let img64 = new Buffer.from(data.image, "base64").toString("binary");
        this.setState({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          previewImgUrl: img64,
          image: img64,
        });
      }
    }
    // let { userInfo } = this.props;
    // if (userInfo && userInfo.id) {
    //   let res = await getAllUsers(userInfo.id);
    //   if (res && res.errCode === 0) {
    //     let data = res.users;
    //     let img64 = new Buffer.from(data.image, "base64").toString("binary");
    //     this.setState({
    //       id: data.id,
    //       firstName: data.firstName,
    //       lastName: data.lastName,
    //       address: data.address,
    //       phonenumber: data.phonenumber,
    //       gender: data.gender,
    //       previewImgUrl: img64,
    //       image: img64,
    //     });
    //   }
    // }
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["firstName", "lastName", "address", "phonenumber"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.warning("Missing parameter : " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        image: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };
  handleSaveUser = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      let res = await editUserService(this.state);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        this.getAllUsersFromReact();
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else {
        toast.error("Edit user error !");
      }
    }
  };
  render() {
    //JSX
    console.log(this.state);
    console.log(this.props);
    let genders = this.state.genderArr;
    let { language } = this.props;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="account-container">
          <div className="account-content">
            <div className="preview-img-container">
              <div
                className="preview-image mx-3 my-3"
                style={{
                  backgroundImage: `url(${this.state.previewImgUrl})`,
                }}
                onClick={() => this.openPreviewImage()}
              ></div>
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event)}
              />
              <label className="label-upload">
                <label className="title-img btn" htmlFor="previewImg">
                  Up Avata<i className="fa fa-upload"></i>
                </label>
              </label>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Tên</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.firstName}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "firstName");
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Họ</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.lastName}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "lastName");
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Số Điện Thoại</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.phonenumber}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phonenumber");
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Địa Chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Giới Tính</label>
                <select
                  className="form-select"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "gender");
                  }}
                  value={this.state.gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <button
              className="btn btn-primary custom-btn"
              onClick={() => this.handleSaveUser()}
            >
              Sửa Thông Tin
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
