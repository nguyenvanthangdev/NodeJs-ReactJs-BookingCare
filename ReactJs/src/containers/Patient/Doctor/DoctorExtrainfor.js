import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtrainfor.scss";
// eslint-disable-next-line

class DoctorExtrainfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
    };
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor } = this.state;
    return (
      <React.Fragment>
        <div className="doctor-extra-infor-container">
          <div className="content-up">
            <div className="text-address">ĐỊA CHỈ KHÁM</div>
            <div className="name-clinic">Phòng khám chuyên khoan Da Liễu</div>
            <div className="detail-address">32 Đại Từ, Hoàng Mai, Hà Nội</div>
          </div>
          <div className="content-down">
            {isShowDetailInfor === false && (
              <div className="short-infor">
                GIÁ KHÁM : 150.000đ .{" "}
                <span onClick={() => this.showHideDetailInfor(true)}>
                  Xem chi tiết
                </span>
              </div>
            )}
            {isShowDetailInfor === true && (
              <>
                <div className="title-price">GIÁ KHÁM</div>
                <div className="detail-infor">
                  <div className="price">
                    <span className="left">Giá khám : </span>
                    <span className="right">150.000đ</span>
                  </div>
                  <div className="note">
                    Chưa bao gồm chi phí chụp chiếu, xét nghiệm 150.000đ
                  </div>
                </div>

                <div className="payment">
                  Áp dụng cho bệnh nhân đăng ký khám chữa bệnh
                </div>
                <div className="hide-price">
                  <span onClick={() => this.showHideDetailInfor(false)}>
                    Ẩn bảng giá
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
