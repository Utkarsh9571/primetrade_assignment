import express from 'express';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import noteRouter from './routes/note.routes.js';
import adminRouter from './routes/admin.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cors from 'cors';
import swagger from './swagger.js';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import securityMiddleware from './middlewares/security.middleware.js';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(securityMiddleware());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/note', noteRouter);
app.use('/api/v1/admin', adminRouter);
app.use(
  '/api/v1/api-docs',
  swagger.swaggerUi.serve,
  swagger.swaggerUi.setup(swagger.specs)
);

app.use(errorMiddleware);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.get('/', (req, res) => {
  logger.info('Hello from Notes logger');
  res.send('Notes API in running!');
});

app.listen(PORT, async () => {
  console.log(`Notes App API is running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
