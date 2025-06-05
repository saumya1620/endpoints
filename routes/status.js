const express = require('express');
const store = require('../store/memoryStore');
const router = express.Router();

router.get('/status/:id', (req, res) => {
  const ingestion = store.ingestions[req.params.id];
  if (!ingestion) return res.status(404).json({ error: 'Not found' });

  const batchStatuses = ingestion.batches.map(b => store.batches[b.batch_id]?.status);
  let status = 'yet_to_start';
  if (batchStatuses.every(s => s === 'completed')) status = 'completed';
  else if (batchStatuses.some(s => s === 'triggered')) status = 'triggered';

  res.json({
    ingestion_id: req.params.id,
    status,
    batches: ingestion.batches.map(b => ({
      batch_id: b.batch_id,
      ids: b.ids,
      status: store.batches[b.batch_id].status
    }))
  });
});

module.exports = router;
