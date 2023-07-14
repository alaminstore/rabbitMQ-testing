const amqp = require("amqplib/callback_api");
amqp.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
    throw err;
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    let queueName = "technical";
    let message = "This  message is from technical channel";
    channel.assertQueue(queueName, {
      durable: false,
    });
      channel.sendToQueue(queueName, Buffer.from(message));
      console.log('message',message)
    setTimeout(() => {
      connection.close();
    }, 1000);
  });
});
