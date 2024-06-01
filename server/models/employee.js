import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        get() {
            return this.getDataValue('status') ? 'active' : 'inactive';
        },
        set(value) {
            this.setDataValue('status', value === 'active');
        }
        /*   get() {
              return this.getDataValue('status') ? 'active' : 'inactive';
          },
          set(value) {
              // Convert 'active' or 'inactive' strings to boolean
              if (value === 'active') {
                  this.setDataValue('status', true);
              } else if (value === 'inactive') {
                  this.setDataValue('status', false);
              }
          } */
    },

   /*  status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
    }, */

}, {
    timestamps: true,
});

export default Employee;
