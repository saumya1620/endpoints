const request = require('supertest');
const app = require('../app'); 

describe('Data Ingestion API', () => {
  let ingestionId;

  test('POST /ingest - should create a new ingestion request', async () => {
    const response = await request(app)
      .post('/ingest')
      .send({ ids: [1, 2, 3, 4, 5], priority: 'HIGH' })
      .expect(200);

    expect(response.body).toHaveProperty('ingestion_id');
    ingestionId = response.body.ingestion_id;
  });

  test('GET /status/:ingestion_id - should retrieve ingestion status', async () => {
    const response = await request(app)
      .get(`/status/${ingestionId}`)
      .expect(200);

    expect(response.body).toHaveProperty('ingestion_id', ingestionId);
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('batches');
    expect(Array.isArray(response.body.batches)).toBe(true);
  });
});
