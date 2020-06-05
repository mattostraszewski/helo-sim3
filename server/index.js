require('dotenv').config()
const massive = require('massive'),
  express = require('express'),
  app = express(),
  { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env

app.use(express.json())

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(db => {
  app.set('db', db)
  console.log("DB connected!")
}).catch(error => {
  console.log(error)
})


app.listen(SERVER_PORT, () => { console.log(`Prancing and Dancing on port ${SERVER_PORT}`) })