import { RabbitMQ } from '../colas/rabbitmq';

const rabbitMQ = new RabbitMQ('amqp://localhost:5672');

async function start() {
  await rabbitMQ.connect();

  const channel = rabbitMQ.getChannel();

  await rabbitMQ.consumeFromQueue('usuario-creado', (msg) => {
    if (msg) {
      const message = JSON.parse(msg.content.toString());
      console.log('Received message:', message);
      channel.ack(msg); 
    }
  });

  await rabbitMQ.consumeFromQueue('queja-actualizado', (msg) => {
    if (msg) {
      const message = JSON.parse(msg.content.toString());
      console.log('Received message:', message);
      
      channel.ack(msg); 
    }
  });

  await rabbitMQ.consumeFromQueue('queja-eliminado', (msg) => {
    if (msg) {
      const message = JSON.parse(msg.content.toString());
      console.log('Received message:', message);
      
      channel.ack(msg); 
    }
  });
}

start().catch(err => console.error('Error:', err));
