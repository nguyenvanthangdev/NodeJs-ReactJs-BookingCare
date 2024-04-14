import React, { Component } from "react";
import { connect } from "react-redux";
import { allClinicService } from "../../../services/ApiService";
import Slider from "react-slick";
import { withRouter } from "react-router";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCinic: [],
    };
  }
  async componentDidMount() {
    let res = await allClinicService("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        dataCinic: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };
  render() {
    let { dataCinic } = this.state;
    console.log("fhusdf", this.state);
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataCinic &&
                dataCinic.length > 0 &&
                dataCinic.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer.from(
                      item.image,
                      "base64"
                    ).toString("binary");
                  }
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div
                        className="bg-image section-medical-facility"
                        style={{
                          backgroundImage: `url(${imageBase64})`,
                        }}
                      ></div>
                      <div style={{ marginTop: "15px" }}>{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
