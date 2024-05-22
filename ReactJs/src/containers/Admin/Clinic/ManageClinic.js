import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  allClinicService,
  createClinicService,
  getEditClinicService,
  deleteClinicService,
} from "../../../services/ApiService";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import Select from "react-select";
import Lightbox from "react-image-lightbox";
import CustomScrollbars from "../../../components/CustomScrollbars";
const mdParser = new MarkdownIt();

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      // selectedClinic: "",
      AllClinic: [],
      isOpenSeleced: false,
      // nameSelectedClinic: "",
      previewImgUrl: "",
      isOpen: false,
      isOpenModal: false,
      clinicToDelete: null,
    };
  }

  async componentDidMount() {
    this.AllClinic();
  }
  AllClinic = async () => {
    let res = await allClinicService("ALL");
    if (res && res.errCode === 0 && res.data) {
      this.setState({
        AllClinic: res.data,
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
  hanldSaveNewClinic = async () => {
    let { isOpenSeleced } = this.state;
    if (isOpenSeleced === false) {
      let res = await createClinicService(this.state);
      if (res && res.errCode === 0) {
        this.AllClinic();
        toast.success("Add new Clinic succeeds !");
        this.setState({
          isOpenSeleced: false,
          id: "",
          name: "",
          address: "",
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
      let res = await getEditClinicService(this.state);
      if (res && res.errCode === 0) {
        this.AllClinic();
        toast.success("Edit clinic succeeds !");
        this.setState({
          isOpenSeleced: false,
          id: "",
          name: "",
          address: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          previewImgUrl: "",
          // selectedClinic: "",
        });
      } else {
        toast.error("Missing required parameter!");
        console.log(res);
      }
    }
  };
  handleChangeSelect = async (item) => {
    let res = await allClinicService(item.id);
    if (res && res.errCode === 0 && res.data) {
      let clinic = res.data;
      let image64 = "";
      if (clinic.image) {
        image64 = new Buffer.from(clinic.image, "base64").toString("binary");
      }
      this.setState({
        isOpenSeleced: true,
        id: clinic.id,
        name: clinic.name,
        address: clinic.address,
        descriptionHTML: clinic.descriptionHTML,
        descriptionMarkdown: clinic.descriptionMarkdown,
        imageBase64: image64,
        previewImgUrl: image64,
      });
    } else {
      this.setState({
        isOpenSeleced: false,
        id: "",
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        previewImgUrl: "",
      });
    }
  };
  handleDeleteClinic = async () => {
    const { clinicToDelete } = this.state;
    try {
      let res = await deleteClinicService(clinicToDelete.id);
      if (res && res.errCode === 0) {
        await this.AllClinic();
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
  handleModal = (clinic) => {
    this.setState({
      isOpenModal: true,
      clinicToDelete: clinic, // Set the clinic to delete
    });
  };

  toggle = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
      clinicToDelete: null, // Reset the clinic to delete
    });
  };
  render() {
    console.log("Clinic", this.state);
    let { isOpenSeleced, AllClinic } = this.state;
    return (
      <div className="manage-clinic-container">
        <div className="m-s-title my-5">Quản lý cơ sở</div>
        <div className="container-title-clinic">
          <div className="container container-body-clinic">
            <div className="row">
              {/* <div className="form-row">
                <div className="col-12 form-group">
                  <label className="title-custom1-clinic">
                    Chọn Cơ sở cần chỉnh sữa
                  </label>
                  <Select
                    className="select-doctor"
                    value={this.state.selectedClinic}
                    onChange={this.handleChangeSelect}
                    options={this.state.AllClinic.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    placeholder={""}
                  />
                </div>
              </div> */}
              <div className="form-row my-3">
                <div className="col-12 form-group">
                  <label className="title-custom1-clinic">Tên Cơ sở</label>
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
              <div className="form-row my-3">
                <div className="col-12 form-group">
                  <label className="title-custom1-clinic">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                  />
                </div>
              </div>
              <div className="form-row my-3">
                <div className="col-12 form-group">
                  <label className="title-custom3-clinic">Hình Ảnh</label>
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
                  ? "btn btn-primary btn-custom-clinic"
                  : "btn btn-warning btn-custom-clinic"
              }
              onClick={() => this.hanldSaveNewClinic()}
            >
              {isOpenSeleced === false ? (
                <span>Thêm thông tin</span>
              ) : (
                <span>Lưu thông tin</span>
              )}
            </button>
          </div>
          <div className="col-12 introductory-information">
            <div className="title-custom3-clinic">Thông tin chi tiết cơ sở</div>
            <div className="form-group-custom">
              <MdEditor
                className="custom-mdeditor-clinic"
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
          </div>
          <div className="table-clinic">
            <CustomScrollbars
              style={{ height: "570px" }}
              className="scrollbars-custom"
            >
              <div className="clinic-table">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Tên Cơ Sở</th>
                      <th className="customcolumn" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {AllClinic &&
                      AllClinic.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td className="customcolumn">
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
              onClick={this.handleDeleteClinic}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
