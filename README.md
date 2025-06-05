Setup: npm install && node app.js

Test: npm test

Endpoints:

POST /ingest – Submit data

GET /status/:id – Check status

Logic:

Async batching (3 IDs per batch)

One batch per 5 seconds

Priority and timestamp based ordering

Mocking external API using delay

<<<<<<< HEAD
Hosted on Render: https://endpoints-vndq.onrender.com
=======

