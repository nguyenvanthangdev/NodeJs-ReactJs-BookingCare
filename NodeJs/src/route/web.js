import express from "express";
import getHomePage from "../controllers/homeController";
import userController from "../controllers/userController";

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

  router.post("/api/login", userController.handleLogin);
  //User
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  // Allcode
  router.get("/api/allcode", userController.getAllCode);

  return app.use("/", router);
};
module.exports = initWebRoutes;
