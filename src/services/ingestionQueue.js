const { v4: uuidv4 } = require("uuid");
let ingestionQueue = []; // Priority queue
let ingestionStore = {}; // Holds all ingestion requests and batches
let interval = null;

// --- Define enqueueIngestion ---
function enqueueIngestion(ingestionId, ids, priority, createdAt) {
  // Break ids into chunks of 3
  const chunks = [];
  for (let i = 0; i < ids.length; i += 3) {
    chunks.push(ids.slice(i, i + 3));
  }

  ingestionStore[ingestionId] = {
    ingestion_id: ingestionId,
    status: "yet_to_start",
    batches: []
  };

  chunks.forEach((chunk) => {
    const batchId = uuidv4();
    ingestionStore[ingestionId].batches.push({
      batch_id: batchId,
      ids: chunk,
      status: "yet_to_start"
    });

    ingestionQueue.push({
      ingestionId,
      batchId,
      ids: chunk,
      priority,
      createdAt
    });
  });

  // Sort queue: higher priority first, then earlier timestamp
  ingestionQueue.sort((a, b) => {
    const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
}

function startQueueProcessor() {
  if (interval) return; // avoid multiple processors

  interval = setInterval(() => {
    if (ingestionQueue.length === 0) return;

    const job = ingestionQueue.shift();
    const { ingestionId, batchId, ids } = job;

    updateBatchStatus(ingestionId, batchId, "triggered");
    console.log(`Processing: ${batchId} IDs: ${ids}`);

    setTimeout(() => {
      updateBatchStatus(ingestionId, batchId, "completed");
      console.log(`Completed: ${batchId}`);
    }, ids.length * 1000); // simulate processing delay per ID
  }, 5000); // one batch every 5s
}

//let interval = null;

function startQueueProcessor() {
  if (interval) return;
  interval = setInterval(() => {
    if (ingestionQueue.length === 0) return;

    // Your batch processing logic...
  }, 5000);
}

function stopQueueProcessor() {
  clearInterval(interval);
  interval = null;
}

module.exports = {
  startQueueProcessor,
  stopQueueProcessor,
  // enqueueIngestion, getIngestionStatus, etc.
};


function getIngestionStatus(ingestionId) {
  return ingestionStore[ingestionId];
}

module.exports = {
  enqueueIngestion,
  startQueueProcessor,
  stopQueueProcessor,
  getIngestionStatus
};
