import { DataTypes, Model } from 'sequelize';
import db from "./index.js";
class User extends Model {
    static associate(models) {
        User.hasMany(db.customer, {
            foreignKey: 'userId',
        });
    }
}
export default (sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'user', // Specify the table name
    });
    return User;
};
//# sourceMappingURL=user.js.map