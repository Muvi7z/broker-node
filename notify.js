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
  client.subscribe(['notify'], function (err) {
    if (!err) {
      //client.publish('presence', 'Hello from client');
      console.log('Notify has subscribed successfull');
    }
  });
});

client.on('message', function (topic, message) {
  // message is Buffer
  const pay = JSON.parse(message);
  console.log(topic, `[${pay.id}]: ${pay.email} - выполнил оплату`);
});
