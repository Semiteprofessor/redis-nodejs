const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 6379;

// Middleware to parse JSON requests
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
