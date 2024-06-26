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
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialtyService = (inputId) => {
  return axios.get(`/api/all-specialty?id=${inputId}`);
};
const getEditSpecialtyService = (inputData) => {
  return axios.put("/api/edit-specialty", inputData);
};
const deleteSpecialtyService = (specialtyId) => {
  return axios.delete("/api/delete-specialty", {
    data: {
      id: specialtyId,
    },
  });
};
const getDetailSpecialtyByIdService = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const allClinicService = (inputId) => {
  return axios.get(`/api/all-clinic?id=${inputId}`);
};
const createClinicService = (data) => {
  return axios.post("/api/create-new-clinic", data);
};
const getEditClinicService = (inputData) => {
  return axios.put("/api/edit-clinic", inputData);
};
const deleteClinicService = (clinicId) => {
  return axios.delete("/api/delete-clinic", {
    data: {
      id: clinicId,
    },
  });
};
const getDetailClinicByIdService = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
const getListPatientForDoctorService = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?date=${data.date}`);
};
//doctor${data.doctorId}&
const getAllScheduleService = (data) => {
  return axios.get(
    `/api/get-all-schedule?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const getDeleteScheduleService = (scheduleId) => {
  return axios.delete("/api/get-delete-schedule", {
    data: {
      id: scheduleId,
    },
  });
};

const getHistoryBookingService = (inputPatientId) => {
  return axios.get(`/api/get-history-booking?patientId=${inputPatientId}`);
};
//Dashboard
const getCountUserService = () => {
  return axios.get(`/api/get-users-count`);
};
const getCountDoctorService = () => {
  return axios.get(`/api/get-doctor-count`);
};
const getCountClinicService = () => {
  return axios.get(`/api/get-clinic-count`);
};
const getCountSpecialtyService = () => {
  return axios.get(`/api/get-specialty-count`);
};
const getSumMoneyService = () => {
  return axios.get(`/api/get-price-sum`);
};
const getSumMoneyService1 = () => {
  return axios.get(`/api/get-price-sum1`);
};
const getSumMoneyService2 = () => {
  return axios.get(`/api/get-price-sum2`);
};
const getCountBookingService = () => {
  return axios.get(`/api/get-booking-count`);
};
const getCountBookingService1 = () => {
  return axios.get(`/api/get-booking-count1`);
};

const sendRemedyService = (data) => {
  return axios.post("/api/send-remedy", data);
};
const handleDeleteBookingService = (bookingId) => {
  return axios.delete("/api/get-delete-booking", {
    data: {
      id: bookingId,
    },
  });
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
  getEditSpecialtyService,
  deleteSpecialtyService,
  getDetailSpecialtyByIdService,
  createClinicService,
  allClinicService,
  getEditClinicService,
  deleteClinicService,
  getDetailClinicByIdService,
  getListPatientForDoctorService,
  getAllScheduleService,
  getDeleteScheduleService,
  getHistoryBookingService,
  getCountClinicService,
  getCountUserService,
  getCountDoctorService,
  getCountSpecialtyService,
  getSumMoneyService,
  getSumMoneyService1,
  getSumMoneyService2,
  getCountBookingService,
  getCountBookingService1,
  sendRemedyService,
  handleDeleteBookingService,
};
