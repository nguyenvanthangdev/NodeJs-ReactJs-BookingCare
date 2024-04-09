"DoctorDescription strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DoctorDescription.belongsTo(models.User, { foreignKey: "doctorId" });
    }
  }
  DoctorDescription.init(
    {
      doctorDescriptionHTML: DataTypes.TEXT("long"),
      doctorDescriptionMarkdown: DataTypes.TEXT("long"),
      description: DataTypes.TEXT("long"),
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DoctorDescription",
      //freezeTableName: true,
    }
  );
  return DoctorDescription;
};
