'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, { foreignKey: 'sender_id' })
      Message.belongsTo(models.User, { foreignKey: 'recipient_id' })
      Message.belongsTo(models.PurchaseOrder, { foreignKey: 'order_id' })
    }
  }
  Message.init({
    sender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      },
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PurchaseOrder',
        key: 'id'
      },
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};