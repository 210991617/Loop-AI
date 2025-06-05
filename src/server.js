const express = require("express");
const app = express();
const PORT = 5000;

const ingestRouter = require("./routes/ingest");
const statusRouter = require("./routes/status");
const { startQueueProcessor } = require("./services/ingestionQueue");

app.use(express.json());
app.use("/ingest", ingestRouter);
app.use("/status", statusRouter);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startQueueProcessor();
});

module.exports = server; // <-- Export it

