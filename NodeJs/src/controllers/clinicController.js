import clinicServices from "../services/clinicServices";

let allClinic = async (req, res) => {
  try {
    let infor = await clinicServices.allClinicService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let createClinic = async (req, res) => {
  try {
    let infor = await clinicServices.createClinicService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let editClinic = async (req, res) => {
  try {
    let infor = await clinicServices.editClinicService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let deleteClinic = async (req, res) => {
  try {
    let infor = await clinicServices.deleteClinicService(req.body.id);
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
  createClinic: createClinic,
  allClinic: allClinic,
  editClinic: editClinic,
  deleteClinic: deleteClinic,
};
