import express from 'express';
import authRouter from './routes/auth.routes.js';
import noteRouter from './routes/note.routes.js';
import adminRouter from './routes/admin.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cors from 'cors';
import swagger from './swagger.js';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
//import securityMiddleware from './middlewares/security.middleware.js';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);

//app.use(securityMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/note', noteRouter);
app.use('/api/v1/admin', adminRouter);

app.use(
  '/api/v1/api-docs',
  swagger.swaggerUi.serve,
  swagger.swaggerUi.setup(swagger.specs)
);

app.use(errorMiddleware);

app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.get('/', (req, res) => {
  logger.info('Hello from Notes logger');
  res.send('Notes App in running!');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    Timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Notes App is running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
