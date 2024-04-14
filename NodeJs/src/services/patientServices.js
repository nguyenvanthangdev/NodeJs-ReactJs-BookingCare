import db from "../models/index";
let checkRequiredFields = (inputData) => {
  let arrFields = ["email", "doctorId", "timeType", "date", "reason", "price"];
  let isValid = true;
  let element = "";
  for (let i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isValid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isValid: isValid,
    element: element,
  };
};
let postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkRequiredFields(data);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameter ${checkObj.element} !`,
        });
      } else {
        let user = await db.User.findOne({
          where: { email: data.email },
          // defaults: {
          //   email: data.email,
          //   roleId: "R3",
          // },
        });
        if (!user) {
          resolve({
            errCode: 2,
            errMessage: "Email different from login email !",
          });
        }
        // if (user && user[0]) {
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
          statusId: "S2",
          doctorId: data.doctorId,
          patientId: user.id,
          date: data.date,
          timeType: data.timeType,
          reason: data.reason,
          price: data.price,
        });
        // }
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
