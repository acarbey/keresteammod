const reqEvent = (event) => require(`../acaretkinlikler/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('acarload'));
  client.on('message', reqEvent('mesajeklentisi'));
  client.on('ready', () => reqEvent('botrpc')(client));
};
