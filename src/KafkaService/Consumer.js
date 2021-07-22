const { Kafka } = require('kafkajs');
const NewBetMail = require('../sendMail');

module.exports = class Consumer {
    consumer;

    constructor({ groupId }) {
        const kafka = new Kafka({
            brokers: ['localhost:9092']
        })
        this.consumer = kafka.consumer({ groupId })
    }

    async consume({ topic }) {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic, fromBeginning: false });

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                NewBetMail(message.value.toString())
                // console.log({ message: message.value.toString() })
            }   
        })
    }
}