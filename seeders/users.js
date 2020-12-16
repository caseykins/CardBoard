'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bulkUsers = await queryInterface.bulkInsert('users', [
      {
        email: 'casey@test.com',
        name: 'casey',
        userName: 'Caseykins',
        password: 'case',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'bob@test.com',
        name: 'bob',
        userName: 'Bobby',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'jimbo@test.com',
        name: 'jim',
        userName: 'Jimboy',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'billy@test.com',
        name: 'billy',
        userName: 'Big Bill',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {returning: true})
    console.log("bulkInsert: ", bulkUsers)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};