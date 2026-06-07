import app from "./app";
import { connectToMongoDB } from "./database/mongodb";
import { PORT } from "./config/constant";

const start = async () => {
  await connectToMongoDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
