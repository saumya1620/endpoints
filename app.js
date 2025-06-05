const express = require('express');
const app = express();
app.use(express.json());

const ingestRouter = require('./routes/ingest');
const statusRouter = require('./routes/status');
app.use('/', ingestRouter);
app.use('/', statusRouter);

app.get('/', (req, res) => {
  res.send('Endpoints are running');
});

module.exports = app;
