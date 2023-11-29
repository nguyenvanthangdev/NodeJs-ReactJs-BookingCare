import express from "express";
import getHomePage from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", getHomePage.getHomePage);
  router.get("/about", getHomePage.getAboutPage);
  router.get("/crud", getHomePage.getCRUD);
  router.post("/post-crud", getHomePage.postCRUD);
  router.get("/get-crud", getHomePage.displaygetCRUD);
  router.get("/edit-crud", getHomePage.getEditCRUD);
  router.post("/put-crud", getHomePage.putCRUD);
  router.get("/delete-crud", getHomePage.deleteCRUD);
  //Login
  router.post("/api/login", userController.handleLogin);
  //User
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  // Allcode
  router.get("/api/allcode", userController.getAllCode);
  //Top Doctor
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  //Doctor
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctors", doctorController.postInforDoctors);
  router.get("/api/get-detail-doctor", doctorController.getDetailDoctorById);
  return app.use("/", router);
};
module.exports = initWebRoutes;
