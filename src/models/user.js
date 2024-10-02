'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Message, {
        foreignKey: 'sender_id',
        as: 'sent_messages'
      })
      User.hasMany(models.Message, {
        foreignKey: 'recipient_id',
        as: 'received_messages'
      })
      User.hasMany(models.Change, {
        foreignKey: 'user_id',
        as: 'changes_made'
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo_path: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};