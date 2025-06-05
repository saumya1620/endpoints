const express = require('express');
const { v4: uuidv4 } = require('uuid');
const store = require('../store/memoryStore');
const router = express.Router();

router.post('/ingest', (req, res) => {
  const { ids, priority = 'MEDIUM' } = req.body;
  if (!Array.isArray(ids) || !['HIGH', 'MEDIUM', 'LOW'].includes(priority)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const ingestion_id = uuidv4();
  store.ingestions[ingestion_id] = {
    priority,
    status: 'yet_to_start',
    batches: []
  };
  for (let i = 0; i < ids.length; i += 3) {
    const batch_ids = ids.slice(i, i + 3);
    const batch_id = uuidv4();
    const batch = { batch_id, ids: batch_ids, status: 'yet_to_start' };
    store.batches[batch_id] = batch;
    store.ingestions[ingestion_id].batches.push(batch);

    store.queue.push({
      ingestion_id,
      batch_id,
      priority,
      created_at: Date.now(),
    });
  }

  res.json({ ingestion_id });
});

module.exports = router;
