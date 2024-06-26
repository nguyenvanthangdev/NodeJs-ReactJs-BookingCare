import db from "../models/index";
let allSpecialtyService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let specialty = "";
        if (inputId === "ALL") {
          specialty = await db.Specialty.findAll({});
        }
        if (inputId && inputId !== "ALL") {
          specialty = await db.Specialty.findOne({
            where: { id: inputId },
          });
        }
        resolve({
          errCode: 0,
          data: specialty,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
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
let editSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      }
      let specialty = await db.Specialty.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (specialty) {
        specialty.name = data.name;
        if (data.imageBase64) {
          specialty.image = data.imageBase64;
        }
        specialty.descriptionHTML = data.descriptionHTML;
        specialty.descriptionMarkdown = data.descriptionMarkdown;
        await specialty.save();
        resolve({
          errCode: 0,
          errMessage: "Update the specialty succeeds !",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "Specialty Error!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteSpecialtyService = (specialtyId) => {
  return new Promise(async (resolve, reject) => {
    if (!specialtyId) {
      resolve({
        errCode: 1,
        errMessage: "Missing required parameters",
      });
    } else {
      let specialty = await db.Specialty.findOne({
        where: { id: specialtyId },
      });
      if (!specialty) {
        resolve({
          errCode: 2,
          errMessage: "Specialty is not exist",
        });
      }
      await db.Specialty.destroy({
        where: { id: specialtyId },
      });
      resolve({
        errCode: 0,
        errMessage: "The specialty is deleted",
      });
    }
  });
};

let getDetailSpecialtyByIdService = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    if (!inputId || !location) {
      resolve({
        errCode: 1,
        errMessage: "Missing required parameters",
      });
    } else {
      let data = await db.Specialty.findOne({
        where: { id: inputId },
        attributes: ["descriptionHTML", "descriptionMarkdown"],
      });
      if (data) {
        let doctorSpecialty = [];
        if (location === "ALL") {
          doctorSpecialty = await db.Doctor_Detail.findAll({
            where: { specialtyId: inputId },
            attributes: ["doctorId", "provinceId"],
          });
        } else {
          doctorSpecialty = await db.Doctor_Detail.findAll({
            where: { specialtyId: inputId, provinceId: location },
            attributes: ["doctorId", "provinceId"],
          });
        }
        data.doctorSpecialty = doctorSpecialty;
      } else data = {};
      resolve({
        errCode: 0,
        errMessage: "Ok",
        data,
      });
    }
  });
};
let handleCountSpecialtyService = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.Specialty.count();
      resolve(count);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createSpecialtyService: createSpecialtyService,
  allSpecialtyService: allSpecialtyService,
  editSpecialtyService: editSpecialtyService,
  deleteSpecialtyService: deleteSpecialtyService,
  getDetailSpecialtyByIdService: getDetailSpecialtyByIdService,
  handleCountSpecialtyService: handleCountSpecialtyService,
};
