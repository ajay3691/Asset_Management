import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const AssetCategory = sequelize.define('AssetCategory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: true,
});

export default AssetCategory;
