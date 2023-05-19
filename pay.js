const mqtt = require('mqtt');

const host = 'dcef12d0.ala.us-east-1.emqxsl.com';
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
  client.subscribe(['pay'], function (err) {
    if (!err) {
      //client.publish('presence', 'Hello from client');
      console.log('Service Pay has subscribed successfull');
    }
  });
});

client.on('message', function (topic, message) {
  // message is Buffer

  if (topic === 'pay') {
    const person = JSON.parse(message);
    console.log(
      topic,
      `[ID:${person.accountHistory[0].account}] ` +
        person.email +
        ' - оплата пользователя прошла успешно!',
    );
    const reply = {
      id: person.accountHistory[0].account,
      email: person.email,
    };
    client.publish('pay-reply', JSON.stringify(reply));
  }
});
