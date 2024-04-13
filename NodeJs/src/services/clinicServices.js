import db from "../models/index";

let allClinicService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let clinic = "";
        if (inputId === "ALL") {
          clinic = await db.Clinic.findAll({});
        }
        if (inputId && inputId !== "ALL") {
          clinic = await db.Clinic.findOne({
            where: { id: inputId },
          });
        }
        resolve({
          errCode: 0,
          data: clinic,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
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
let editClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.selectedClinic.value ||
        !data.nameSelectedClinic ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      }
      let clinic = await db.Clinic.findOne({
        where: { id: data.selectedClinic.value },
        raw: false,
      });
      if (clinic) {
        if (data.nameSelectedClinic) {
          clinic.name = data.nameSelectedClinic;
        }
        if (data.imageBase64) {
          clinic.image = data.imageBase64;
        }
        clinic.address = data.address;
        clinic.descriptionHTML = data.descriptionHTML;
        clinic.descriptionMarkdown = data.descriptionMarkdown;
        await clinic.save();
        resolve({
          errCode: 0,
          errMessage: "Update the clinic succeeds !",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "Clinic Error!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteClinicService = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    if (!clinicId) {
      resolve({
        errCode: 1,
        errMessage: "Missing required parameters",
      });
    } else {
      let clinic = await db.Clinic.findOne({
        where: { id: clinicId },
      });
      if (!clinic) {
        resolve({
          errCode: 2,
          errMessage: "Clinic is not exist",
        });
      }
      await db.Clinic.destroy({
        where: { id: clinicId },
      });
      resolve({
        errCode: 0,
        errMessage: "The clinic is deleted",
      });
    }
  });
};
let getDetailClinicByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    if (!inputId) {
      resolve({
        errCode: 1,
        errMessage: "Missing required parameters",
      });
    } else {
      let data = await db.Clinic.findOne({
        where: { id: inputId },
        attributes: [
          "name",
          "address",
          "descriptionHTML",
          "descriptionMarkdown",
        ],
      });
      if (data) {
        let doctorClinic = [];
        doctorClinic = await db.Doctor_Detail.findAll({
          where: { clinicId: inputId },
          attributes: ["doctorId", "provinceId"],
        });
        data.doctorClinic = doctorClinic;
      } else data = {};
      resolve({
        errCode: 0,
        errMessage: "Ok",
        data,
      });
    }
  });
};
module.exports = {
  createClinicService: createClinicService,
  allClinicService: allClinicService,
  editClinicService: editClinicService,
  deleteClinicService: deleteClinicService,
  getDetailClinicByIdService: getDetailClinicByIdService,
};
