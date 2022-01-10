const database = require('./db');
const app = require('./app');
const appWs = require('./app-ws');
const settingsRepository = require('./repositories/settingsRepository');
const appEm = require('./app-em');

(async () => {
  console.log('Getting the default settings...');
  const settings = await settingsRepository.getDefaultSettings();
  if (!settings) return new Error('There is no settings');

  console.log('Initializing the Beholder brain...');

  console.log('Starting the Server Apps...');
  const server = app.listen(process.env.PORT, () => {
    console.log('App is running at 3001');
  });

  const wss = appWs(server);

  await appEm.init(settings, wss, {});
})();
