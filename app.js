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
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
