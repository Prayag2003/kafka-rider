import { Partitioners } from 'kafkajs'
import kafkaClient from "./kafkaClient.js";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init() {
    const producer = kafkaClient.producer({
        createPartitioner: Partitioners.LegacyPartitioner
    }
    )
    console.log("Connecting the producer");

    await producer.connect();

    console.log("Producer connected successfully...");

    rl.setPrompt('---|-->> ')
    rl.prompt()

    rl.on('line', async function (line) {
        const [riderName, location] = line.split(' ')

        await producer.send({
            topic: 'location-updates',
            messages: [
                {
                    partition: location.toLowerCase() === "north" ? 0 : 1,
                    key: 'loc-updates',
                    value: JSON.stringify({ name: riderName, location })
                }
            ]
        });
    })

    rl.on('close', async () => {
        await producer.disconnect()
    })
}

init()