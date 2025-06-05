const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const {
  enqueueIngestion
} = require("../services/ingestionQueue");

router.post("/", (req, res) => {
  const { ids, priority } = req.body;
  if (!ids || !priority) {
    return res.status(400).json({ error: "Missing ids or priority" });
  }

  const ingestionId = uuidv4();
  enqueueIngestion(ingestionId, ids, priority, new Date());

  res.status(200).json({ ingestion_id: ingestionId });
});

module.exports = router;
