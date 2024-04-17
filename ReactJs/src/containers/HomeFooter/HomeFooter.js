import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class HomeFooter extends Component {
  handleViewMoreDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/more-doctor`);
    }
  };
  handleViewMoreSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/more-specialty`);
    }
  };
  handleViewMoreClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/more-clinic`);
    }
  };
  render() {
    return (
      <div className="section-share section-home-footer">
        <footer className="text-center text-lg-start bg-white text-muted">
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div>
              <a href="#!" className="me-4 link-secondary">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#!" className="me-4 link-secondary">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#!" className="me-4 link-secondary">
                <i className="fab fa-google"></i>
              </a>
              <a href="#!" className="me-4 link-secondary">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#!" className="me-4 link-secondary">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#!" className="me-4 link-secondary">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </section>
          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"></div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                  <p>
                    <a
                      href="#!"
                      className="text-reset"
                      onClick={() => this.handleViewMoreSpecialty()}
                    >
                      Medical Speciality
                    </a>
                  </p>
                  <p>
                    <a
                      href="#!"
                      className="text-reset"
                      onClick={() => this.handleViewMoreClinic()}
                    >
                      Health facilities
                    </a>
                  </p>
                  <p>
                    <a
                      href="#!"
                      className="text-reset"
                      onClick={() => this.handleViewMoreDoctor()}
                    >
                      Doctor
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Examination package
                    </a>
                  </p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p>
                    <i className="fas fa-home me-3 text-secondary"></i> 123 Cù
                    Chính Lan
                  </p>
                  <p>
                    <i className="fas fa-envelope me-3 text-secondary"></i>
                    thisthang24@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone me-3 text-secondary"></i> +
                    0969251032
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="text-center p-4 footer-color">
            © 2024 Copyright:
            <span className="text-reset fw-bold mx-3">Nguyễn Văn Thắng</span>
          </div>
        </footer>
      </div>
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
  connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
);
