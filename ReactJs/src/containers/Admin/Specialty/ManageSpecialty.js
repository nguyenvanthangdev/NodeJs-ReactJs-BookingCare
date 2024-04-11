import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import {
  createNewSpecialtyService,
  getAllSpecialtyService,
  getAllNameSpecialtyService,
  getEditSpecialtyService,
} from "../../../services/userService";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      selectedSpecialty: "",
      nameSpecialty: [],
      isOpenSeleced: false,
      nameselectedSpecialty: "",
      previewImgUrl: "",
    };
  }

  async componentDidMount() {
    this.AllNameSpecialty();
  }
  AllNameSpecialty = async () => {
    let res = await getAllNameSpecialtyService();
    if (res && res.errCode === 0 && res.data) {
      this.setState({
        nameSpecialty: res.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
  }
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    if (id === "name") {
      stateCopy.isOpenSeleced = false;
      stateCopy.imageBase64 = "";
      stateCopy.descriptionHTML = "";
      stateCopy.descriptionMarkdown = "";
      stateCopy.selectedSpecialty = "";
      stateCopy.nameselectedSpecialty = "";
      stateCopy.previewImgUrl = "";
    }
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        imageBase64: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };
  hanldSaveNewSpecialty = async () => {
    let { isOpenSeleced } = this.state;
    if (isOpenSeleced === false) {
      let res = await createNewSpecialtyService(this.state);
      if (res && res.errCode === 0) {
        this.AllNameSpecialty();
        toast.success("Add new specialty succeeds !");
        this.setState({
          isOpenSeleced: false,
          nameselectedSpecialty: "",
          name: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          previewImgUrl: "",
        });
      } else {
        toast.error("Missing required parameter!");
        console.log(res);
      }
    } else {
      let res = await getEditSpecialtyService(this.state);
      if (res && res.errCode === 0) {
        toast.success("Edit new specialty succeeds !");
        this.setState({
          isOpenSeleced: false,
          nameselectedSpecialty: "",
          name: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          previewImgUrl: "",
          selectedSpecialty: "",
        });
      } else {
        toast.error("Missing required parameter!");
        console.log(res);
      }
    }
  };
  handleChangeSelect = async (selectedSpecialty) => {
    this.setState({ selectedSpecialty });
    let res = await getAllSpecialtyService(selectedSpecialty.value);
    if (res && res.errCode === 0 && res.data) {
      let specialty = res.data;
      let image64 = "";
      if (specialty.image) {
        image64 = new Buffer.from(specialty.image, "base64").toString("binary");
      }
      this.setState({
        isOpenSeleced: true,
        nameselectedSpecialty: specialty.name,
        descriptionHTML: specialty.descriptionHTML,
        descriptionMarkdown: specialty.descriptionMarkdown,
        imageBase64: image64,
        previewImgUrl: image64,
      });
    } else {
      this.setState({
        isOpenSeleced: false,
        nameselectedSpecialty: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        previewImgUrl: "",
      });
    }
    this.setState({
      name: "",
    });
  };

  render() {
    console.log("hdaihdws", this.state);
    let { isOpenSeleced } = this.state;
    return (
      <div className="manage-specialty-container">
        <div className="m-s-title my-5">QUẢN LÝ CHUYÊN KHOA</div>
        <div className="container-title-specialty">
          <div className="container container-body-specialty">
            <div className="row">
              <div className="form-row">
                <div className="col-12 form-group">
                  <label className="title-custom1-specialty">
                    Chọn chuyên khoa cần chỉnh sữa
                  </label>
                  <Select
                    className="select-doctor"
                    value={this.state.selectedSpecialty}
                    onChange={this.handleChangeSelect}
                    options={this.state.nameSpecialty.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    placeholder={""}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-12 form-group">
                  <label className="title-custom1-specialty">
                    Tạo chuyên Khoa
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "name")
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-12 form-group">
                  <label className="title-custom2-specialty">Hình Ảnh</label>
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
            </div>
            <button
              className={
                isOpenSeleced === false
                  ? "btn btn-primary btn-custom-specialty"
                  : "btn btn-warning btn-custom-specialty"
              }
              onClick={() => this.hanldSaveNewSpecialty()}
            >
              {isOpenSeleced === false ? (
                <span>Tạo thông tin</span>
              ) : (
                <span>Lưu thông tin</span>
              )}
            </button>
          </div>
          <div className="col-12 introductory-information">
            <div className="title-custom3-specialty">
              Thông tin chi tiết chuyên khoa
            </div>
            <div className="form-group-custom">
              <MdEditor
                className="custom-mdeditor-specialty"
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,

    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
