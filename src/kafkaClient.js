import { Kafka } from "kafkajs";
import { KAFKA_PORT } from "../constants"

const PRIVATE_IP = process.env.PRIVATE_IP
export const kakfaClient = new Kafka({
    clientId: 'zomato',
    brokers: [`${PRIVATE_IP}:${KAFKA_PORT}`],
})