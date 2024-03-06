import kafkaClient from "./kafkaClient.js";
const groupId = process.argv[2]

async function init() {
    const consumer = kafkaClient.consumer({ groupId: groupId })
    await consumer.connect()

    await consumer.subscribe({ topics: ['location-updates'], fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(
                `\nGROUP: ${groupId} | TOPIC: [${topic}] | 
                Partition: [${partition}] | Data: `
                + message.value.toString()
            );
        }
    })
}
init()