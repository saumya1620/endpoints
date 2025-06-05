const store = require('./store/memoryStore');

const RATE_LIMIT_MS = 5000;
let isProcessing = false;

function simulateApi(id) {
  return new Promise(resolve =>
    setTimeout(() => resolve({ id, data: "processed" }), 1000)
  );
}

async function processBatch(batch) {
  batch.status = 'triggered';
  const promises = batch.ids.map(id => simulateApi(id));
  await Promise.all(promises);
  batch.status = 'completed';
}

async function processQueue() {
  if (isProcessing || store.queue.length === 0) return;
  isProcessing = true;
  const now = Date.now();
  store.queue.sort((a, b) => {
    const prio = { HIGH: 1, MEDIUM: 2, LOW: 3 };
    if (prio[a.priority] !== prio[b.priority])
      return prio[a.priority] - prio[b.priority];
    return a.created_at - b.created_at;
  });

  const next = store.queue.shift();
  const batch = store.batches[next.batch_id];
  await processBatch(batch);

  setTimeout(() => {
    isProcessing = false;
    processQueue();
  }, RATE_LIMIT_MS);
}

setInterval(processQueue, 1000);

module.exports = { processQueue };
