import axios from "../axios";
const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveInforDoctorsService = (data) => {
  return axios.post(`/api/save-infor-doctors`, data);
};

const getDetailDoctorByIdService = (inputId) => {
  return axios.get(`/api/get-detail-doctor?id=${inputId}`);
};
const SaveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postBookAppointmentService = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
const createNewSpecialtyService = (data) => {
  return axios.post("/api/creace-new-specialty", data);
};

const getAllSpecialtyService = (inputId) => {
  return axios.get(`/api/all-specialty?id=${inputId}`);
};
const getAllNameSpecialtyService = () => {
  return axios.get(`/api/all-namespecialty`);
};
const getEditSpecialtyService = (inputData) => {
  return axios.put("/api/edit-specialty", inputData);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveInforDoctorsService,
  getDetailDoctorByIdService,
  SaveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorByIdService,
  getProfileDoctorByIdService,
  postBookAppointmentService,
  createNewSpecialtyService,
  getAllSpecialtyService,
  getAllNameSpecialtyService,
  getEditSpecialtyService,
};
