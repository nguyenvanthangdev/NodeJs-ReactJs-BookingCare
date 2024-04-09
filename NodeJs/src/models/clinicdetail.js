"ClinicDetail strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClinicDetail extends Model {
    static associate(models) {
      // define association here
      ClinicDetail.belongsTo(models.User, { foreignKey: "doctorId" });

      ClinicDetail.belongsTo(models.Allcode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceTypeData",
      });
      ClinicDetail.belongsTo(models.Allcode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceTypeData",
      });
      ClinicDetail.belongsTo(models.Allcode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentTypeData",
      });
    }
  }
  ClinicDetail.init(
    {
      doctorId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ClinicDetail",
      //freezeTableName: true,
    }
  );
  return ClinicDetail;
};
