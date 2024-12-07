import amqp, { Connection, Channel } from 'amqplib';

export class RabbitMQ {
  private connection!: Connection;
  private channel!: Channel;

  constructor(private rabbitMQUrl: string) {}

  async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.rabbitMQUrl);
      this.channel = await this.connection.createChannel();
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
      throw error; 
    }
  }
  
  public getChannel(): Channel {
    if (!this.channel) {
      throw new Error('RabbitMQ channel is not initialized');
    }
    return this.channel;
  }

  async sendToQueue(queue: string, message: any): Promise<void> {
    if (!this.channel) {
      throw new Error('RabbitMQ channel is not initialized. Ensure connect() was called.');
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log('Mensaje enviado a la cola:', queue);
  }

  async consumeFromQueue(queue: string, callback: (msg: any) => void): Promise<void> {
    const channel = this.getChannel(); 
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
      if (msg) {
        callback(msg);
      }
    });
  }
}
