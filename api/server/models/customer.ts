import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import db from "./index.js";

interface CustomerAttributes {
  id: number;
  name: string;
  age: number;
  address: string | null;
  imagePath: string | null;
  userId: number;
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id'> {}

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  public id!: number;
  public name!: string;
  public age!: number;
  public address!: string | null;
  public imagePath:string | null;
  public userId!: number;

  static associate(models: any) {
    Customer.belongsTo(db.user, {
      foreignKey: 'userId',
    });
  }
}

export default (sequelize: Sequelize) => {
  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      imagePath:{
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // Use 'User' here
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Customer',
      tableName: 'customer', 
    }
  );

  return Customer;
};
