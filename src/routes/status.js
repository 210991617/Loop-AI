const express = require("express");
const router = express.Router();
const {
  getIngestionStatus
} = require("../services/ingestionQueue");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const result = getIngestionStatus(id);
  if (!result) {
    return res.status(404).json({ error: "Ingestion ID not found" });
  }

  res.status(200).json(result);
});

module.exports = router;
