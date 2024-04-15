import scheduleServices from "../services/scheduleServices";

let getAllSchedule = async (req, res) => {
  try {
    let infor = await scheduleServices.getAllScheduleService(
      req.query.doctorId,
      req.query.date
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

let getDeleteSchedule = async (req, res) => {
  try {
    let infor = await scheduleServices.getDeleteScheduleService(req.body.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
module.exports = {
  getAllSchedule: getAllSchedule,
  getDeleteSchedule: getDeleteSchedule,
};
