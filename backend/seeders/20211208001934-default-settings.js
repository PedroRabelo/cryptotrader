'use strict';
const bcrypt = require('bcryptjs');
const { encrypt } = require('../src/utils/crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const settingsId = await queryInterface.rawSelect(
      'settings',
      { where: {}, limit: 1 },
      ['id'],
    );
    if (!settingsId) {
      return queryInterface.bulkInsert('settings', [
        {
          email: 'pnarabelo@gmail.com',
          password: bcrypt.hashSync('123456'),
          apiUrl: 'https://testnet.binance.vision/api',
          streamUrl: 'wss://testnet.binance.vision/stream',
          accessKey:
            'K94EQzPa5f5wwmCWO9QjbieSUCzgPUT3WU4HMdhrVCGAaR60463mxFQF8mSWoIkj',
          secretKey: encrypt(
            'KXzw5es0Mq3peTdecbCh5tXTA32jnxGkT5dv8l3IDLqQBF1jB8YuVler2AFajjul',
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('settings', null, {});
  },
};
