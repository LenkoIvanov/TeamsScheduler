import winston, { format } from 'winston';

export default (className = '') => {
  return winston.createLogger({
    level: 'info',
    format: format.combine(
      format((info) => {
        info.level = info.level.toUpperCase();
        return info;
      })(),
      format.timestamp(),
      format.colorize(),
      format.printf((msg) => {
        return `[${msg.level}][${msg.timestamp}]: ${formatClassName(className)} ${msg.message}`;
      })
    ),
    transports: [new winston.transports.Console()]
  });
};

const formatClassName = (className: string): string => {
  if (className.length <= 25) {
    const neededWhitespaces = ' '.repeat(25 - className.length);
    return className + neededWhitespaces;
  }

  return className.substring(0, 25);
};
