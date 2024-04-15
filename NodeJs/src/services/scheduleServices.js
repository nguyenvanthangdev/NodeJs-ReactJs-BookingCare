import db from "../models/index";

let getAllScheduleService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let schedules = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: date },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (schedules && schedules.length > 0) {
          resolve({
            errCode: 0,
            data: schedules,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "No schedule found for the specified doctor and date.",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDeleteScheduleService = (scheduleId) => {
  return new Promise(async (resolve, reject) => {
    if (!scheduleId) {
      resolve({
        errCode: 1,
        errMessage: "Missing required parameters",
      });
    } else {
      let schedule = await db.Schedule.findOne({
        where: { id: scheduleId },
      });
      if (!schedule) {
        resolve({
          errCode: 2,
          errMessage: "Schedule is not exist",
        });
      }
      await db.Schedule.destroy({
        where: { id: scheduleId },
      });
      resolve({
        errCode: 0,
        errMessage: "The schedule is deleted",
      });
    }
  });
};
module.exports = {
  getAllScheduleService: getAllScheduleService,
  getDeleteScheduleService: getDeleteScheduleService,
};
