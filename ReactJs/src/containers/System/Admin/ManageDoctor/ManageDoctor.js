import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES } from "../../../../utils";

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
    };
  }

  async componentDidMount() {
    this.props.fetchALLDoctors();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }
  builDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
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
    return result;
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleSaveContentMarkdown = () => {
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
    });
  };
  handleChange = (selectedDoctor) => {
    this.setState(
      { selectedDoctor }
      //     () =>
      //   console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    //console.log(this.state);
    return (
      <React.Fragment>
        <div className="manage-doctor-title my-5">
          Tạo thêm thông tin doctors
        </div>
        <div className="manage-doctor-content">
          <div className="content-left">
            <div className="more-infor-top">
              <label className="title-doctor form-group">Chọn bác sĩ</label>
              <Select
                className="select-doctor"
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctors}
              />
            </div>
            <div className="more-infor-down">
              <div className="title-doctor form-group">
                Thông tin giới thiệu
              </div>
              <textarea
                className="form-control custom-text"
                rows="14"
                onChange={(event) => this.handleChangeDesc(event)}
                value={this.state.description}
              ></textarea>
            </div>
            <div className="custom-btn">
              <button
                className="btn btn-warning"
                onClick={() => this.handleSaveContentMarkdown()}
              >
                Lưu thông tin
              </button>
            </div>
          </div>
          <div className="content-right">
            <MdEditor
              className="custom-mdeditor"
              style={{ height: "540px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchALLDoctors: () => dispatch(actions.fetchALLDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
