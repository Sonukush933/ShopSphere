import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

// Connection Success
redisClient.on("connect", () => {
  console.log("🟥 Redis Connected");
});

// Connection Error
redisClient.on("error", (error) => {
  console.error("❌ Redis Error:", error);
});

// Function to connect Redis
export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("❌ Failed to connect Redis:", error);
    process.exit(1);
  }
};