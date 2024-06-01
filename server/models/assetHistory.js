import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Asset from './asset.js';

const AssetHistory = sequelize.define('AssetHistory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    assetId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.STRING
    },
}, {
    timestamps: true,
});

export default AssetHistory;
