import { kakfaClient } from "./kafkaClient.js";
import * as dotenv from "dotenv"
dotenv.config()

async function init() {
    const admin = kakfaClient.admin()
    await admin.connect()
    console.log("Admin connected");

    console.log("Creating a Topic [rider-updates]...");
    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2
        }]
    })
    console.log("Topic [rider-updates] created...");

    console.log("Disconnecting Admin");
    await admin.disconnect()
}

init()


