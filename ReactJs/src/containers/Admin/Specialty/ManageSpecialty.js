import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  createNewSpecialtyService,
  getAllSpecialtyService,
  getEditSpecialtyService,
  deleteSpecialtyService,
} from "../../../services/ApiService";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Lightbox from "react-image-lightbox";
import CustomScrollbars from "../../../components/CustomScrollbars";
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      //selectedSpecialty: "",
      AllSpecialty: [],
      isOpenSeleced: false,
      //nameselectedSpecialty: "",
      previewImgUrl: "",
      isOpen: false,
      isOpenModal: false,
      specialtyToDelete: null, // Track specialty to delete
    };
  }

  async componentDidMount() {
    this.AllSpecialty();
  }

  AllSpecialty = async () => {
    let res = await getAllSpecialtyService("ALL");
    if (res && res.errCode === 0 && res.data) {
      this.setState({
        AllSpecialty: res.data,
      });
    }
  };

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
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
        this.AllSpecialty();
        toast.success("Add new specialty succeeds !");
        this.setState({
          isOpenSeleced: false,
          id: "",
          //nameselectedSpecialty: "",
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
        this.AllSpecialty();
        toast.success("Edit specialty succeeds !");
        this.setState({
          isOpenSeleced: false,
          id: "",
          //nameselectedSpecialty: "",
          name: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          previewImgUrl: "",
          //selectedSpecialty: "",
        });
      } else {
        toast.error("Missing required parameter!");
        console.log(res);
      }
    }
  };

  handleChangeSelect = async (item) => {
    let res = await getAllSpecialtyService(item.id);
    if (res && res.errCode === 0 && res.data) {
      let specialty = res.data;
      let image64 = "";
      if (specialty.image) {
        image64 = new Buffer.from(specialty.image, "base64").toString("binary");
      }
      this.setState({
        isOpenSeleced: true,
        id: specialty.id,
        name: specialty.name,
        descriptionHTML: specialty.descriptionHTML,
        descriptionMarkdown: specialty.descriptionMarkdown,
        imageBase64: image64,
        previewImgUrl: image64,
      });
    } else {
      this.setState({
        isOpenSeleced: false,
        id: "",
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        previewImgUrl: "",
      });
    }
  };

  handleDeleteSpecialty = async () => {
    const { specialtyToDelete } = this.state;
    try {
      let res = await deleteSpecialtyService(specialtyToDelete.id);
      if (res && res.errCode === 0) {
        await this.AllSpecialty();
        toast.success(res.errMessage);
        this.toggle();
      } else {
        toast.error(res.errMessage);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  handleModal = (specialty) => {
    this.setState({
      isOpenModal: true,
      specialtyToDelete: specialty, // Set the specialty to delete
    });
  };

  toggle = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
      specialtyToDelete: null, // Reset the specialty to delete
    });
  };

  render() {
    let { isOpenSeleced, AllSpecialty } = this.state;
    console.log("check", this.state);
    return (
      <div className="manage-specialty-container">
        <div className="m-s-title my-5">QUẢN LÝ CHUYÊN KHOA</div>
        <div className="container-title-specialty">
          <div className="container container-body-specialty">
            <div className="row">
              {/* <div className="form-row">
                <div className="col-12 form-group">
                  <label className="title-custom1-specialty">
                    Chọn chuyên khoa cần chỉnh sữa
                  </label>
                  <Select
                    className="select-doctor"
                    value={this.state.selectedSpecialty}
                    onChange={this.handleChangeSelect}
                    options={this.state.AllSpecialty.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    placeholder={""}
                  />
                </div>
              </div> */}
              <div className="form-row my-5">
                <div className="col-12 form-group">
                  <label className="title-custom1-specialty">
                    Tên chuyên Khoa
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
                <div className="col-12 form-group my-3">
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
                <span>Thêm thông tin</span>
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
          <div className="table-specialty">
            <CustomScrollbars
              style={{ height: "570px" }}
              className="scrollbars-custom"
            >
              <div className="specialty-table">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Tên Khoa</th>
                      <th className="customcolumn" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {AllSpecialty &&
                      AllSpecialty.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td className="customcolumn ">
                              <button
                                type="button"
                                className="btn btn-warning px-3 mx-2"
                                onClick={() => this.handleChangeSelect(item)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger px-3"
                                onClick={() => this.handleModal(item)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </CustomScrollbars>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
        <Modal
          isOpen={this.state.isOpenModal}
          toggle={() => {
            this.toggle();
          }}
          size="lg"
          centered
        >
          <ModalHeader
            className="text-dark bg-white"
            toggle={() => {
              this.toggle();
            }}
          >
            Thông báo
          </ModalHeader>
          <ModalBody>
            <div>Bạn có muốn xóa không?</div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-danger px-3"
              onClick={this.handleDeleteSpecialty}
            >
              Xác Nhận
            </Button>
            <Button
              className="btn px-3"
              color="secondary"
              onClick={() => {
                this.toggle();
              }}
            >
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
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
