const express = require('express')
const Consumer = require('./src/KafkaService/Consumer');
const dotenv = require('dotenv');

const app = express()
dotenv.config();
const consumer = new Consumer({ groupId: 'betgroup' });

async function run() {
  await consumer.consume({ topic: 'new_bet' });

  const port = 3000
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


}

run().catch(console.error)

