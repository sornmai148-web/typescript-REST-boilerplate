import express from "express";

import { errorHandler } from "@middleware/errorHandler.mid";
import router from "@routes/item.route";

const app = express();

app.use(express.json());

// Routes
app.use("/api/items", router);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
