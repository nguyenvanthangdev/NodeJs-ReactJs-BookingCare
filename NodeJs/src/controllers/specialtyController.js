import specialtyServices from "../services/specialtyServices";

let allSpecialty = async (req, res) => {
  try {
    let infor = await specialtyServices.allSpecialtyService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let allNameSpecialty = async (req, res) => {
  try {
    let infor = await specialtyServices.allNameSpecialtyService();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let createSpecialty = async (req, res) => {
  try {
    let infor = await specialtyServices.createSpecialtyService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let editSpecialty = async (req, res) => {
  try {
    let infor = await specialtyServices.editSpecialtyService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let deleteSpecialty = async (req, res) => {
  try {
    let infor = await specialtyServices.deleteSpecialtyService(req.body.id);
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
  createSpecialty: createSpecialty,
  allSpecialty: allSpecialty,
  allNameSpecialty: allNameSpecialty,
  editSpecialty: editSpecialty,
  deleteSpecialty: deleteSpecialty,
};
