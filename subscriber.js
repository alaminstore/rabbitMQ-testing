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

    channel.assertQueue(queueName, {
      durable: false,
    });

    // channel.consume(
    //   queueName,
    //   (msg) => {
    //     console.log("Recieved", msg.content.toString());
    //   },
    //   {
    //     noAck: true, //acknowledge channel for all received message
    //   }
    // );
    channel.consume(queueName, (msg) => {
      console.log("Recieved", msg.content.toString());
      channel.ack(msg); // for spilicit received message
    });

    setTimeout(() => {
      connection.close();
    }, 1000);
  });
});
