import morgan from 'morgan';
import createLogger from '../constants/logger';

const logger = createLogger('HttpLoggingMiddleware');

export default morgan(
  ':method [Status: :status] - URL :url [Content-Length: :res[content-length]] - :response-time ms',
  {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }
);
