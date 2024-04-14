"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Allcode, {
        foreignKey: "positionId",
        targetKey: "keyMap",
        as: "positionData",
      });
      User.belongsTo(models.Allcode, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderData",
      });
      User.hasOne(models.Doctor_Expertise, { foreignKey: "doctorId" });
      User.hasOne(models.Doctor_Detail, { foreignKey: "doctorId" });

      User.hasMany(models.Schedule, {
        foreignKey: "doctorId",
        as: "doctorData",
      });

      User.hasMany(models.Booking, {
        foreignKey: "patientId",
        as: "patientData",
      });
      User.hasMany(models.Booking, {
        foreignKey: "doctorId",
        as: "doctorDataBooking",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      image: DataTypes.BLOB("long"),
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
