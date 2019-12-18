module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      unique: true
    },
    registrationNumber: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: "registration_number"
    },
    name: {
      type: Sequelize.STRING
    },
    designation: {
      type: Sequelize.STRING
    },
    password: {
      type: String
    },
    role: {
      type: String
    },
    //Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
  return User;
};
