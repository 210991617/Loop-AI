const store = {};

function saveIngestion(ingestionId, priority, batches) {
  store[ingestionId] = { ingestion_id: ingestionId, priority, batches };
}

function updateBatchStatus(ingestionId, batchId, status) {
  const ingestion = store[ingestionId];
  if (!ingestion) return;
  ingestion.batches.find(b => b.batch_id === batchId).status = status;
}

function getIngestionStatus(ingestionId) {
  const ingestion = store[ingestionId];
  if (!ingestion) return null;

  const statuses = ingestion.batches.map(b => b.status);
  let overall = "yet_to_start";
  if (statuses.every(s => s === "completed")) overall = "completed";
  else if (statuses.some(s => s === "triggered" || s === "completed")) overall = "triggered";

  return { ...ingestion, status: overall };
}

module.exports = { saveIngestion, updateBatchStatus, getIngestionStatus };
