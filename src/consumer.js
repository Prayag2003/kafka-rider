import { kakfaClient } from "./kafkaClient";
const groupId = process.argv[2]

async function init() {
    const consumer = kakfaClient.consumer({ groupId: groupId })
    await consumer.connect()

    await consumer.subscribe({ topics: ['rider-updates'], fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`Group:${groupId} : [${topic} : Partition:${partition}:]` + message.value.toString());
        }
    })
}