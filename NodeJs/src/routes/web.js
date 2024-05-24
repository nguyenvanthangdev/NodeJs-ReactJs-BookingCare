import express from "express";

import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import scheduleController from "../controllers/scheduleController";
let router = express.Router();
let initWebRoutes = (app) => {
  //Login
  router.post("/api/login", userController.handleLogin);
  //User
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/get-doctor-count", userController.handleCountDoctor);
  router.get("/api/get-users-count", userController.handleCountUsers);
  // Allcode
  router.get("/api/allcode", userController.getAllCode);
  //Top Doctor
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  //Doctor
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctors", doctorController.postInforDoctors);
  router.get("/api/get-detail-doctor", doctorController.getDetailDoctorById);
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    doctorController.getExtraInforDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );
  router.post("/api/send-remedy", doctorController.sendRemedy);
  //Schedule
  router.get("/api/get-all-schedule", scheduleController.getAllSchedule);
  router.delete(
    "/api/get-delete-schedule",
    scheduleController.getDeleteSchedule
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  //Patient
  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );
  router.get("/api/get-history-booking", patientController.getHistoryBooking);
  router.get("/api/get-price-sum", patientController.handleSumPrice);
  router.get("/api/get-price-sum1", patientController.handleSumPrice1);
  router.get("/api/get-price-sum2", patientController.handleSumPrice2);
  router.get("/api/get-booking-count", patientController.handleCountBooking);
  router.get("/api/get-booking-count1", patientController.handleCountBooking1);
  router.delete(
    "/api/get-delete-booking",
    patientController.handleDeleteBooking
  );

  //Specialty
  router.get("/api/all-specialty", specialtyController.allSpecialty);
  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.put("/api/edit-specialty", specialtyController.editSpecialty);
  router.delete("/api/delete-specialty", specialtyController.deleteSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );
  router.get(
    "/api/get-specialty-count",
    specialtyController.handleCountSpecialty
  );
  //Clinic
  router.get("/api/all-clinic", clinicController.allClinic);
  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.put("/api/edit-clinic", clinicController.editClinic);
  router.delete("/api/delete-clinic", clinicController.deleteClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );
  router.get("/api/get-clinic-count", clinicController.handleCountClinic);

  return app.use("/", router);
};
module.exports = initWebRoutes;
