import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import AssetCategory from './assetCategory.js';

const Asset = sequelize.define('Asset', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    serialNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: AssetCategory,
            key: 'id',
        },
        allowNull: false,
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('in stock', 'issued', 'scrapped'),
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default Asset;
