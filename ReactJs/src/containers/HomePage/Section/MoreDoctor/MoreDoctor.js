import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";
import "./MoreDoctor.scss";
import HomeHeader from "../../Home/HomeHeader";
import { LANGUAGES } from "../../../../utils";

class MoreDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      searchQuery: "",
    };
  }

  async componentDidMount() {
    this.props.fetchALLDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctors: this.props.allDoctors,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  handleSearchInputChange = (event) => {
    let searchQuery = event.target.value.toLowerCase();
    this.setState({ searchQuery });
  };

  render() {
    let { listDoctors, searchQuery } = this.state;
    let { language } = this.props;

    let filteredDoctors = listDoctors.filter(
      (doctor) =>
        doctor.lastName.toLowerCase().includes(searchQuery) ||
        doctor.firstName.toLowerCase().includes(searchQuery)
    );

    return (
      <>
        <HomeHeader />
        <div className="more-doctor-container">
          <div className="more-doctor-content">
            <div className="d-flex">
              <input
                className="form-control me-2 my-2"
                type="search"
                value={searchQuery}
                onChange={this.handleSearchInputChange}
              />
              <button className="btn btn-primary my-2" type="submit">
                Tìm Kiếm
              </button>
            </div>
            <div className="more-doctor-card">
              <div className="container">
                <div className="row">
                  {filteredDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer.from(
                        item.image,
                        "base64"
                      ).toString("binary");
                    }
                    let nameVi = `${item.lastName} ${item.firstName}`;
                    let positionVi = `${item.positionData.valueVi}`;
                    let nameEn = `${item.firstName} ${item.lastName}`;
                    let positionEn = `${item.positionData.valueEn} `;
                    return (
                      <div
                        className="col-md-2 mb-3 mx-5"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div className="card card-custom">
                          <div className="img-container">
                            <div
                              className="bg-image-card section-more-doctor"
                              style={{
                                backgroundImage: `url(${imageBase64})`,
                              }}
                            ></div>
                          </div>
                          <div className="position text-center">
                            <div>
                              {language === LANGUAGES.VI
                                ? positionVi
                                : positionEn}
                            </div>
                            <div>
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MoreDoctor)
);
