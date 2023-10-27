import { DataTypes, Model } from 'sequelize';
import db from "./index.js";
class Customer extends Model {
    static associate(models) {
        Customer.belongsTo(db.user, {
            foreignKey: 'userId',
        });
    }
}
export default (sequelize) => {
    Customer.init({
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
        imagePath: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
    }, {
        sequelize,
        modelName: 'Customer',
        tableName: 'customer',
    });
    return Customer;
};
//# sourceMappingURL=customer.js.map