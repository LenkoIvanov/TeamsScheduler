import express from 'express';
import cors from 'cors';
import httpLoggingMiddleware from './midddleware/httpLoggingMiddleware';
import eventsRouter from './routes/eventsRouter';
import authMiddleware from './midddleware/msalAuthMiddleware';
import errorHandlerMiddleware from './midddleware/errorHandlingMiddleware';

const app = express();

/** Configurations */
app.use(httpLoggingMiddleware);
app.use(cors());
app.use(express.json()); // parse JSON requests
app.use(
  express.urlencoded({
    // recognizes incoming objectts as strings or arrays
    extended: true
  })
);

/** Routers */
app.use('/events', authMiddleware, eventsRouter);

/** After routers middlewares */
app.use(errorHandlerMiddleware);

export default app;
