const request = require("supertest");
const server = require("../src/server");
const { stopQueueProcessor } = require("../src/services/ingestionQueue");
afterAll(() => {
  stopQueueProcessor(); // Avoid open handle warning
});

const app = require("../src/server"); // If using exported app instance
describe("Ingestion API", () => {
  it("should return ingestion_id", async () => {
    const res = await request("http://localhost:5000")
      .post("/ingest")
      .send({ ids: [1, 2, 3, 4, 5], priority: "HIGH" });
    expect(res.statusCode).toBe(200);
    expect(res.body.ingestion_id).toBeDefined();
  });
const { startQueueProcessor, stopQueueProcessor } = require('../src/services/ingestionQueue');

beforeAll(() => {
  startQueueProcessor();
});


afterAll(() => {
  server.close();            // <-- Close server
  stopQueueProcessor();      // <-- Stop setInterval
});


it("should return status", async () => {
  const res = await request("http://localhost:5000")
    .post("/ingest")
    .send({ ids: [10, 11, 12], priority: "LOW" });

  const ingestionId = res.body.ingestion_id;

  // Wait for processing (simulate wait - 3 ids = 1 batch => ~5 seconds + buffer)
  await new Promise(resolve => setTimeout(resolve, 7000));

  const statusRes = await request("http://localhost:5000")
    .get(`/status/${ingestionId}`);

  expect(statusRes.body.status).toBeDefined();
  expect(statusRes.body.batches).toHaveLength(1);
}, 10000); // <-- Increased timeout to 10 seconds
});