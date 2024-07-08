const { promisify } = require("node:util");
const redis = require("redis");

// Configure Redis client
const client = redis.createClient();
client.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

// Promisify Redis commands for async/await
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const delAsync = promisify(client.del).bind(client);
const keysAsync = promisify(client.keys).bind(client);

module.exports = {
  setAsync,
  getAsync,
  delAsync,
  keysAsync,
  client, // Keep the Redis client for other modules to use it if needed.
};
