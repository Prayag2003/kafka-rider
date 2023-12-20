import { Kafka } from "kafkajs";

export const kakfaClient = new Kafka({
    clientId: 'tomato',
    brokers: ['192.168.225.126:9092'],
})