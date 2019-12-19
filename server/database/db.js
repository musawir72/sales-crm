const Sequelize = require("sequelize");

//live db connection
// const sequelize = new Sequelize("sales-crm", "postgres", "Sql1server2!", {
//   pool: {
//     max: 5,
//     min: 0,
//     require: 30000,
//     idle: 10000
//   },
//   host: "sales-crm.ccgqx43uwom0.us-east-2.rds.amazonaws.com",
//   dialect: "postgres"
// });

//local db connection
const sequelize = new Sequelize("cloudtek", "test", 5432, {
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000
  },
  host: "localhost",
  dialect: "postgres"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/User")(sequelize, Sequelize);
db.job = require("../models/Job")(sequelize, Sequelize);

// Here we can connect companies and products base on company'id
db.user.hasMany(db.job, {
  foreignKey: "userId"
});
db.user.hasMany(db.job, {
  foreignKey: "assignTo"
});

db.job.belongsTo(db.user, {
  as: "jobId",
  foreignKey: "userId",
  targetKey: "registrationNumber",
  onDelete: "CASCADE"
});
db.job.belongsTo(db.user, {
  as: "leadId",
  foreignKey: "assignTo",
  targetKey: "registrationNumber",
  onDelete: "CASCADE"
});
module.exports = db;
