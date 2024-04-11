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
        let specialty = await db.Specialty.findOne({
          where: { id: inputId },
        });
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
let allNameSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let specialty = await db.Specialty.findAll({
        attributes: {
          exclude: [
            "image",
            "descriptionMarkdown",
            "descriptionHTML",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      resolve({
        errCode: 0,
        data: specialty,
      });
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
        !data.selectedSpecialty.value ||
        !data.nameselectedSpecialty ||
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
        where: { id: data.selectedSpecialty.value },
        raw: false,
      });
      if (specialty) {
        if (data.nameselectedSpecialty) {
          specialty.name = data.nameselectedSpecialty;
        }
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
module.exports = {
  createSpecialtyService: createSpecialtyService,
  allSpecialtyService: allSpecialtyService,
  allNameSpecialtyService: allNameSpecialtyService,
  editSpecialtyService: editSpecialtyService,
};
