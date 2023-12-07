const WebSocket = require('ws');
const amqp = require('amqplib/callback_api');
const auth = require('../helpers/auth');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
    auth.authenticate(req, {}, (err) => {
        if (err) {
            ws.close();
            return;
        }

        const queue = 'notificationQueue:' + req.user.id;

        amqp.connect('amqp://localhost', (err, conn) => {
            if (err) {
                throw err;
            }

            conn.createChannel((err, ch) => {
                if (err) {
                    throw err;
                }

                ch.assertQueue(queue, { durable: false });

                ch.consume(queue, msg => {
                    ws.send(msg.content.toString());
                }, { noAck: true });
            });
        });
    });
});

/*
const QUEUE_NAME = 'SUPIMPA';

(async () => {
  const conn = await amqp.connect('amqp://rabbitmq'),
        channel = await conn.createChannel();

  channel.consume(QUEUE_NAME, (msg) => {
    console.log(msg.content.toString());
    channel.ack(msg);
  });
})();

*/