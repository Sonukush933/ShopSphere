import "dotenv/config";
import { connectTestDB, disconnectTestDB } from "./db";

beforeAll(async () => {
  console.log("🚀 Starting Test Suite...");

  await connectTestDB();
});

afterAll(async () => {
  await disconnectTestDB();

  console.log("🛑 Test Suite Finished");
});