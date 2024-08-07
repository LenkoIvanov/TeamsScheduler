import 'dotenv/config';
import createLogger from './constants/logger';
import app from './app';

const logger = createLogger();

const PORT = 8888;

app.listen(PORT, () => {
  logger.info(`

  -----------------------------------------------------------

  Conference Rooms Application started listening on port ${PORT}

  -----------------------------------------------------------
  
  `);
});
