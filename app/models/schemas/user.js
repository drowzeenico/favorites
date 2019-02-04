
module.exports = (DataTypes) => ({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    isAlpha: true,
    notNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    isAlpha: true,
    notNull: true
  },
  email: {
    type: DataTypes.STRING,
    isEmail: true,
    notNull: true
  },
  password: {
    type: DataTypes.STRING,
    notNull: true
  },
  birthday: {
    type: DataTypes.DATE,
    notNull: true
  }, 
  gender: {
    type: DataTypes.ENUM(0, 1),
    notNull: true
  }
});