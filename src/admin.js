import kafkaClient from "./kafkaClient.js";

async function init() {
    const admin = kafkaClient.admin()
    await admin.connect()
    console.log("Admin connected");
    console.log("Creating a Topic -> [location-updates]...");
    await admin.createTopics({
        topics: [{
            topic: 'location-updates',
            // North-India, South-India { based on locations }
            numPartitions: 2
        }]
    })
    console.log("Topic [location-updates] created...");

    console.log("Disconnecting Admin");
    await admin.disconnect()
}

init()