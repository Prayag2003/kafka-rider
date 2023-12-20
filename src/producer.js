import { kakfaClient } from "./kafkaClient";
import { readLine } from "readline";

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init() {
    const producer = kakfaClient.producer()
    console.log("Connecting the producer");

    await producer.connect();
    console.log("Producer connected successfully...");

    rl.setPrompt('>')
    rl.prompt()

    rl.on('line', async function (line) {
        const [riderName, location] = line.split('')
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase() === "north" ? 0 : 1,
                    key: "location-update",
                    value: JSON.stringify({ name: riderName, location: location })
                }
            ]
        });
    }).on('close', async () => {
        await producer.disconnect()
    })



}

init()