import axios from "../axios";
const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const getAllUsers1 = (inputId) => {
  return axios.get(`/api/get-all-users1?id=${inputId}`);
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
const getAllCodeService1 = (inputType) => {
  return axios.get(`/api/allcode1?type=${inputType}`);
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

export {
  handleLoginApi,
  getAllUsers,
  getAllUsers1,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getAllCodeService1,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveInforDoctorsService,
  getDetailDoctorByIdService,
  SaveBulkScheduleDoctor,
  getScheduleDoctorByDate,
};
