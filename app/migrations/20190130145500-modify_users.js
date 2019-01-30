
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.addColumn('Users', 'birthday', {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('Users', 'gender', {
        type: Sequelize.ENUM(0, 1)
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'password'),
      queryInterface.removeColumn('Users', 'birthday'),
      queryInterface.removeColumn('Users', 'gender')
    ])
  }
};
