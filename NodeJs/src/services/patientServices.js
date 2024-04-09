import db from "../models/index";

let postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // || !data.doctorId || !data.timeType || !data.date
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.reason ||
        !data.price
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });
        if (user && user[0]) {
          //   await db.Booking.findOrCreate({
          //     where: { patientId: user[0].id },
          //     defaults: {
          //       statusId: "S1",
          //       doctorId: data.doctorId,
          //       patientId: user[0].id,
          //       date: data.date,
          //       timeType: data.timeType,
          //     },
          //   });
          await db.Booking.create({
            statusId: "S1",
            doctorId: data.doctorId,
            patientId: user[0].id,
            date: data.date,
            timeType: data.timeType,
            reason: data.reason,
            price: data.price,
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save infor patient succeed !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postBookAppointmentService: postBookAppointmentService,
};
