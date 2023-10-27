import { Sequelize } from "sequelize";
import User from './user.js'; 
import Customer from './customer.js';

const sequelize = new Sequelize("customer_app", "root", "asdf", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  port: 3306,
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {
  Sequelize,
  sequelize,
  user: User(sequelize),
  customer: Customer(sequelize)
};

await db.sequelize.sync({ force: false });

export default db;
