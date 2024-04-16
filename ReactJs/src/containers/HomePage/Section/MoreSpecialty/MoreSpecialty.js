import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./MoreSpecialty.scss";
import HomeHeader from "../../Home/HomeHeader";
import { getAllSpecialtyService } from "../../../../services/ApiService";

class MoreSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
      searchQuery: "",
    };
  }

  async componentDidMount() {
    this.getAllSpecialtyFromReact();
  }

  getAllSpecialtyFromReact = async () => {
    let res = await getAllSpecialtyService("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        listSpecialty: res.data,
      });
    }
  };

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  handleSearchInputChange = (event) => {
    let searchQuery = event.target.value.toLowerCase();
    this.setState({ searchQuery });
  };

  render() {
    let { listSpecialty, searchQuery } = this.state;
    let filteredSpecialties = listSpecialty.filter((specialty) =>
      specialty.name.toLowerCase().includes(searchQuery)
    );

    return (
      <>
        <HomeHeader />
        <div className="more-specialty-container">
          <div className="more-specialty-content">
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
            <div className="more-specialty-card">
              <div className="container">
                <div className="row">
                  {filteredSpecialties.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer.from(
                        item.image,
                        "base64"
                      ).toString("binary");
                    }
                    return (
                      <div
                        className="col-md-2 mb-3 mx-5"
                        key={index}
                        onClick={() => this.handleViewDetailSpecialty(item)}
                      >
                        <div className="card card-custom">
                          <div className="img-container">
                            <div
                              className="bg-image-card section-more-specialty"
                              style={{
                                backgroundImage: `url(${imageBase64})`,
                              }}
                            ></div>
                          </div>
                          <div className="position text-center">
                            <div>{item.name}</div>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MoreSpecialty)
);
