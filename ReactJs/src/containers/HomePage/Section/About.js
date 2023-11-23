import React, { Component } from "react";
import { connect } from "react-redux";
//import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về BookingCare
        </div>
        <div className="section-about-content">
          <div className="content-left">
            {/* <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe> */}
          </div>
          <div className="content-right">
            <p>
              BookingCare là một nền tảng y tế sức khỏe toàn diện. Trang web này
              cung cấp các dịch vụ liên quan đến chăm sóc sức khỏe như tìm bác
              sĩ theo chuyên khoa, chọn bệnh viện hoặc phòng khám, gói khám sức
              khỏe tổng quát, lịch hẹn, hỗ trợ, tìm kiếm, và nhiều chuyên khoa
              khác nhau như Cơ Xương Khớp, Thần kinh, Tiêu hoá, Tim mạch, Tai
              Mũi Họng
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
