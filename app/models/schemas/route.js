
module.exports = (DataTypes) => ({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    notNull: true
  },
  name: {
    type: DataTypes.STRING,
    isAlpha: true,
    notNull: true
  },
  area: {
    type: DataTypes.GEOMETRY('POLYGON', 4236),
    notNull: true
  }
});