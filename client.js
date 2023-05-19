const mqtt = require('mqtt');
var faker = require('faker');
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const port = '8883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `mqtt://45.153.231.101`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

client.on('connect', function () {
  client.subscribe('pay-reply', function (err) {
    if (!err) {
      let answer = '';
      console.log('Отправить запрос на покупку? (Да / Нет)!');
    }
  });

  //client.publish('pay', 'Запрос на покупку');
});

client.on('message', function (topic, message) {
  // message is Buffer
  const pay = JSON.parse(message);
  console.log(`${pay.email}, ваша покупка успешно совершена ID: ${pay.id}`);
  client.publish('notify', message);
  console.log('Отправить запрос на покупку? (Да / Нет)');
});
rl.on('line', (input) => {
  if (input.toLocaleLowerCase() != 'нет' && input.toLocaleLowerCase() != 'да') {
    console.log('Отправить запрос на покупку? (Да / Нет)');
    console.log('Jndtn^ ' + input);
  } else if (input.toLocaleLowerCase() == 'да') {
    const person = faker.helpers.createCard();
    client.publish('pay', JSON.stringify(person));
  }
});
