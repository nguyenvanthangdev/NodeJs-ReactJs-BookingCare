import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let { isOpenModel, closeBookingClose, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    console.log("ashsf", dataTime);
    return (
      <>
        <Modal
          isOpen={isOpenModel}
          toggle={closeBookingClose}
          className="booking-modal-container"
          centered
          size="lg"
        >
          <ModalHeader
            className="modal-header-custom"
            toggle={closeBookingClose}
          >
            Thông tin đặt lịch khám bệnh
          </ModalHeader>
          <ModalBody>
            {/* {JSON.stringify(dataTime)} */}
            <div className="doctor-infor">
              <ProfileDoctor doctorId={doctorId} />
            </div>
            <div className="row ">
              <form className="ml-5 row g-3">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Họ tên</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Số điện thoại</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Địa chỉ Email</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Địa chỉ liên hệ</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Lý do khám</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Đặt cho ai</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Giới tính</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn px-3" color="primary">
              Add New
            </Button>
            <Button
              className="btn px-3"
              color="secondary"
              onClick={closeBookingClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
