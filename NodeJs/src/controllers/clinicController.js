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
let getDetailClinicById = async (req, res) => {
  try {
    let infor = await clinicServices.getDetailClinicByIdService(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let handleCountClinic = async (req, res) => {
  try {
    let count = await clinicServices.handleCountClinicService();
    return res.status(200).json({ count: count });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  createClinic: createClinic,
  allClinic: allClinic,
  editClinic: editClinic,
  deleteClinic: deleteClinic,
  getDetailClinicById: getDetailClinicById,
  handleCountClinic: handleCountClinic,
};
