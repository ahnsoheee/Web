module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'user',
      {
        user_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(88),
          allowNull: true,
        },
        type: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        photo: {
          type: DataTypes.STRING(200),
          allowNull: true
        }
      },
      {
        underscored: true,
        tableName: 'user',
        paranoid: true,
        timestamps: true,
      }
    );
  };
  