require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      let infor = await transporter.sendMail({
        from: '"BookingCare" <thisthang42@gmail.com>',
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt lịch khám bệnh",
        html: `
          <div style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f8f9fa;">
            <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <h2 style="color: #29af33; text-align: center;">Thông tin đặt lịch khám bệnh</h2>
              <p>Xin Chào <strong>${dataSend.patientName}</strong>!</p>
              <p>Bạn nhận được email này vì đã đặt lịch hẹn khám bệnh online trên BookingCare.</p>
              <h3>Thông tin đặt lịch khám bệnh</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #29af33; color: #fff;">
                  <th style="padding: 10px; border: 1px solid #dee2e6;">Thông tin</th>
                  <th style="padding: 10px; border: 1px solid #dee2e6;">Chi tiết</th>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #dee2e6;">Thời gian khám</td>
                  <td style="padding: 10px; border: 1px solid #dee2e6;">${dataSend.time}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #dee2e6;">Lý do khám</td>
                  <td style="padding: 10px; border: 1px solid #dee2e6;">${dataSend.reason}</td>
                </tr>
                <tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #dee2e6;">SĐT liên hệ</td>
                  <td style="padding: 10px; border: 1px solid #dee2e6;">${dataSend.phoneNumber}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #dee2e6;">Địa chỉ</td>
                  <td style="padding: 10px; border: 1px solid #dee2e6;">${dataSend.address}</td>
                </tr>
                </tr>
                  <td style="padding: 10px; border: 1px solid #dee2e6;">Bác sĩ khám</td>
                  <td style="padding: 10px; border: 1px solid #dee2e6;">${dataSend.doctorName}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #dee2e6;">Giá khám</td>
                  <td style="padding: 10px; border: 1px solid #dee2e6;">${dataSend.price} VND</td>
                </tr>
              </table>
              <h4 style="margin-top: 20px;">Xin chân thành cảm ơn!</h4>
            </div>
          </div>
        `,
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      let infor = await transporter.sendMail({
        from: '"BookingCare" <thisthang42@gmail.com>',
        to: dataSend.email,
        subject: "Thông báo kết quả khám bệnh",
        html: `
          <div style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f8f9fa;">
            <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <h2 style="color: #29af33; text-align: center;">Thông tin kết quả khám bệnh</h2>
              <p>Xin Chào <strong>${dataSend.patientName}</strong>!</p>
              <p>Bạn nhận được email này vì bạn đã được khám bệnh thành công</p>
              <h4 style="margin-top: 20px;">Xin chân thành cảm ơn!</h4>
            </div>
          </div>
        `,
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
