import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../../utils";
import { getDetailDoctorByIdService } from "../../../../services/userService";

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      //Save to doctor infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  async componentDidMount() {
    this.props.fetchALLDoctors();
    this.props.getAllRequiredDoctorInfor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors, "USERS");
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.builDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.builDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.builDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.builDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.builDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.builDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }
  builDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
          return null;
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
          return null;
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
          return null;
        });
      }
    }
    return result;
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      //Doctor_Infor
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectProvince: this.state.selectProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await getDetailDoctorByIdService(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };
  handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedDoctor;
    this.setState({
      ...stateCopy,
    });
  };

  handleChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    let { hasOldData } = this.state;
    return (
      <React.Fragment>
        <div className="manage-doctor-title">Tạo thông tin Bác Sĩ</div>
        <div className="manage-doctor-content">
          <div className="content-left">
            <div className="more-infor-top">
              <label className="form-group form-label">Chọn bác sĩ</label>
              <Select
                className="select-doctor"
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
                placeholder={""}
              />
            </div>
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Tên phòng khám</label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleChangeText(event, "nameClinic")
                  }
                  value={this.state.nameClinic}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Địa chỉ phòng khám</label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleChangeText(event, "addressClinic")
                  }
                  value={this.state.addressClinic}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Chọn tỉnh thành</label>
                <Select
                  className="select-doctor"
                  value={this.state.selectProvince}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listProvince}
                  placeholder={""}
                  name="selectProvince"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Chọn giá</label>
                <Select
                  className="select-doctor"
                  value={this.state.selectedPrice}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listPrice}
                  placeholder={""}
                  name="selectedPrice"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Chọn phương thức thanh toán
                </label>
                <Select
                  className="select-doctor"
                  value={this.state.selectedPayment}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listPayment}
                  placeholder={""}
                  name="selectedPayment"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Ghi chú</label>
                <input
                  className="form-control"
                  style={{ height: "38px" }}
                  onChange={(event) => this.handleChangeText(event, "note")}
                  value={this.state.note}
                />
              </div>
            </form>
            <div className="more-infor-down">
              <div className="my-3 form-group form-label">
                Thông tin giới thiệu
              </div>
              <textarea
                className="form-control custom-text"
                rows="8"
                onChange={(event) =>
                  this.handleChangeText(event, "description")
                }
                value={this.state.description}
              ></textarea>
            </div>
            <div className="custom-btn">
              <button
                className={
                  hasOldData === true ? "btn btn-warning" : "btn btn-primary"
                }
                onClick={() => this.handleSaveContentMarkdown()}
              >
                {hasOldData === true ? (
                  <span>Lưu thông tin</span>
                ) : (
                  <span>Tạo thông tin</span>
                )}
              </button>
            </div>
          </div>
          <div className="content-right">
            <MdEditor
              className="custom-mdeditor"
              style={{ height: "540px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    fetchALLDoctors: () => dispatch(actions.fetchALLDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
