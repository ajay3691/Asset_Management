import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Employee from './employee.js';

const Issue = sequelize.define('Issue', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'id',
        },
        allowNull: false,
    },
    assetId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Assets',  // Use table name instead of model name
            key: 'id',
        },
        allowNull: false,
    },
    issueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    returnDate: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: true,
});

export default Issue;
