import patientServices from "../services/patientServices";
let postBookAppointment = async (req, res) => {
  try {
    let infor = await patientServices.postBookAppointmentService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getHistoryBooking = async (req, res) => {
  try {
    let infor = await patientServices.getHistoryBookingService(
      req.query.patientId
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleSumPrice = async (req, res) => {
  try {
    let sum = await patientServices.handleSumPriceService();
    return res.status(200).json({ sum: sum });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleCountBooking = async (req, res) => {
  try {
    let count = await patientServices.handleCountBookingService();
    return res.status(200).json({ count: count });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  postBookAppointment: postBookAppointment,
  getHistoryBooking: getHistoryBooking,
  handleSumPrice: handleSumPrice,
  handleCountBooking: handleCountBooking,
};
