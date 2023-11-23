"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        // email: DataTypes.STRING,
        // password: DataTypes.STRING,
        // firstName: DataTypes.STRING,
        // lastName: DataTypes.STRING,
        // address: DataTypes.STRING,
        // phonenumber: DataTypes.STRING,
        // gender: DataTypes.BOOLEAN,
        // image: DataTypes.STRING,
        // roleId: DataTypes.STRING,
        // positionId: DataTypes.STRING,
        email: "admin@gmail.com",
        password: "123456",
        firstName: "Nguyen",
        lastName: "Thang",
        address: "Da Nang",
        phonenumber: "0969251032",
        gender: 1,
        image: "",
        roleId: "R1",
        positionId: "Manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
