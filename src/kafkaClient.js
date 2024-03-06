import { Kafka } from "kafkajs";
import KAFKA_PORT from "../constants.js"
import * as dotenv from "dotenv"
dotenv.config()

const PRIVATE_IP = process.env.PRIVATE_IP
const kafkaClient = new Kafka({
    clientId: 'zomato',
    brokers: [`${PRIVATE_IP}:${KAFKA_PORT}`],
})

export default kafkaClient