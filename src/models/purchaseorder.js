'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PurchaseOrder.hasMany(models.Message, {
        foreignKey: 'order_id',
        as: 'received_messages'
      })
      PurchaseOrder.hasMany(models.Change, {
        foreignKey: 'order_id',
        as: 'changes'
      })
    }
  }
  PurchaseOrder.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    receipt_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    photo_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PurchaseOrder',
  });
  return PurchaseOrder;
};