import express from "express";
import movieRoutes from "./routes/movies.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

app.use("/api/movies", movieRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
