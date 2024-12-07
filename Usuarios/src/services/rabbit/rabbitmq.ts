import amqp from 'amqplib';

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        console.log('RabbitMQ conectado');
    } catch (error) {
        console.error('Error al conectar con RabbitMQ:', error);
        throw error;
    }
};

export const getChannel = (): amqp.Channel => {
    if (!channel) {
        throw new Error('RabbitMQ no está conectado.');
    }
    return channel;
};
