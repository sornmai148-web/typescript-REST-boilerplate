import express from 'express';

import router from '@routes/item.route';
import { errorHandler } from '@middleware/errorHandler.middleware';
import { requestShortLogger } from '@middleware/logger.middleware';

const app = express();

app.use(requestShortLogger);
app.use(express.json());

// Routes
app.use('/api/items', router);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
