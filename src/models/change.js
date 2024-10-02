'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Change extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Change.belongsTo(models.PurchaseOrder, {foreignKey: 'order_id'})
      Change.belongsTo(models.User, {foreignKey: 'user_id'})
    }
  }
  Change.init({
    order_id: {
      type: DataTypes.JSON,
      references: {
        model: 'PurchaseOrder',
        key: 'id'
      },
      allowNull: false
    },
    user_id: {
      type: DataTypes.JSON,
      references: {
        model: 'User',
        key: 'id'
      },
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    scope: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Change',
  });
  return Change;
};