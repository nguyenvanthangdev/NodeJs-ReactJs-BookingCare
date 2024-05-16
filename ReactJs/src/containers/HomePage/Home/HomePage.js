import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "../Section/Specialty";
import MedicalFacility from "../Section/MedicalFacility";
import OutStandingDoctor from "../Section/OutstanDoctor";
import HomeFooter from "../../HomeFooter/HomeFooter";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <OutStandingDoctor settings={settings} />
        <MedicalFacility settings={settings} />
        <HomeFooter />
        <div>
          <df-messenger
            intent="WELCOME"
            chat-title="BookingCare"
            agent-id="299e7f83-22ff-4966-86f2-93417558f570"
            language-code="en"
          ></df-messenger>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
