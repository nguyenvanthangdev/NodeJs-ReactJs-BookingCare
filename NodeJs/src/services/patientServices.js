import db from "../models/index";
import emailServices from "./emailServices";
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
// let postBookAppointmentService = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let checkObj = checkRequiredFields(data);
//       if (checkObj.isValid === false) {
//         resolve({
//           errCode: 1,
//           errMessage: `Missing parameter ${checkObj.element} !`,
//         });
//       } else {
//         let user = await db.User.findOne({
//           where: { email: data.email },
//           // defaults: {
//           //   email: data.email,
//           //   roleId: "R3",
//           // },
//         });
//         if (!user) {
//           resolve({
//             errCode: 2,
//             errMessage: "Email different from login email !",
//           });
//         }

//         // if (user && user[0]) {
//         //   await db.Booking.findOrCreate({
//         //     where: { patientId: user[0].id },
//         //     defaults: {
//         //       statusId: "S1",
//         //       doctorId: data.doctorId,
//         //       patientId: user[0].id,
//         //       date: data.date,
//         //       timeType: data.timeType,
//         //     },
//         //   });
//         await db.Booking.create({
//           statusId: "S2",
//           doctorId: data.doctorId,
//           patientId: user.id,
//           date: data.date,
//           timeType: data.timeType,
//           reason: data.reason,
//           price: data.price,
//         });
//         // }
//         resolve({
//           errCode: 0,
//           errMessage: "Save infor patient succeed !",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
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
        });
        if (!user) {
          resolve({
            errCode: 2,
            errMessage: "Email different from login email !",
          });
        } else {
          let schedule = await db.Schedule.findOne({
            where: {
              date: data.date,
              timeType: data.timeType,
              doctorId: data.doctorId,
            },
          });
          if (!schedule) {
            resolve({
              errCode: 3,
              errMessage: "Schedule not found!",
            });
          } else if (schedule.currentNumber >= schedule.maxNumber) {
            resolve({
              errCode: 4,
              errMessage: "Schedule is already full!",
            });
          } else {
            await db.Booking.create({
              statusId: "S2",
              doctorId: data.doctorId,
              patientId: user.id,
              date: data.date,
              timeType: data.timeType,
              reason: data.reason,
              price: data.price,
            });
            // Increment currentNumber by 1
            await db.Schedule.update(
              { currentNumber: schedule.currentNumber + 1 },
              { where: { id: schedule.id } }
            );
            await emailServices.sendSimpleEmail({
              reciverEmail: data.email,
              patientName: data.fullName,
              time: data.timeString,
              reason: data.reason,
              address: data.address,
              genders: data.genders,
              doctorName: data.doctorName,
              phoneNumber: data.phoneNumber,
              birthday: data.birthday,
              price: data.price,
            });
            resolve({
              errCode: 0,
              errMessage: "Appointment booked successfully!",
            });
          }
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getHistoryBookingService = (inputPatientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputPatientId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let data = await db.Booking.findAll({
          where: { patientId: inputPatientId },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "email",
                "firstName",
                "lastName",
                "address",
                "gender",
                "phonenumber",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataPatient",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "doctorDataBooking",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSumPriceService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let sum = await db.Booking.sum("price", {
        where: {
          statusId: "S2",
        },
      });
      resolve(sum);
    } catch (e) {
      reject(e);
    }
  });
};
let handleSumPriceService1 = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let sum = await db.Booking.sum("price", {
        where: {
          statusId: "S3",
        },
      });
      resolve(sum);
    } catch (e) {
      reject(e);
    }
  });
};
let handleSumPriceService2 = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let sum = await db.Booking.sum("price");
      resolve(sum);
    } catch (e) {
      reject(e);
    }
  });
};
let handleCountBookingService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.Booking.count({
        where: { statusId: "S2" },
      });
      resolve(count);
    } catch (e) {
      reject(e);
    }
  });
};
let handleCountBookingService1 = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.Booking.count({
        where: { statusId: "S3" },
      });
      resolve(count);
    } catch (e) {
      reject(e);
    }
  });
};

let handleDeleteBookingService = (bookingId) => {
  return new Promise(async (resolve, reject) => {
    if (!bookingId) {
      resolve({
        errCode: 1,
        errMessage: "Missing required parameters",
      });
    } else {
      let booking = await db.Booking.findOne({
        where: { id: bookingId },
      });
      if (!booking) {
        resolve({
          errCode: 2,
          errMessage: "Booking is not exist",
        });
      }
      await db.Booking.destroy({
        where: { id: bookingId },
      });
      resolve({
        errCode: 0,
        errMessage: "The Booking is deleted",
      });
    }
  });
};
module.exports = {
  postBookAppointmentService: postBookAppointmentService,
  getHistoryBookingService: getHistoryBookingService,
  handleSumPriceService: handleSumPriceService,
  handleSumPriceService1: handleSumPriceService1,
  handleSumPriceService2: handleSumPriceService2,
  handleCountBookingService: handleCountBookingService,
  handleCountBookingService1: handleCountBookingService1,
  handleDeleteBookingService: handleDeleteBookingService,
};
