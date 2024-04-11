"Doctor_Expertise strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Expertise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor_Expertise.belongsTo(models.User, { foreignKey: "doctorId" });
    }
  }
  Doctor_Expertise.init(
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
      modelName: "Doctor_Expertise",
      //freezeTableName: true,
    }
  );
  return Doctor_Expertise;
};
