const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
    notification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    reference_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    notification_sender: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    notification_receiver: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    notification_state: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    notification_reference_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    notification_subject: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    notification_message: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    notification_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'notifications',
    timestamps: true,
}); 

module.exports = Notification;