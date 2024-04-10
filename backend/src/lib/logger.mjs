import winston from 'winston';


const { format, createLogger } = winston;

const logLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'bold black redBG',
    error: 'bold red whiteBG',
    warn: 'bold black yellowBG',
    info: 'black greenBG',
    http: 'cyan magentaBG',
    debug: 'black whiteBG',
  },
};

winston.addColors(logLevels.colors);

const defaultFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

const transports = [
  new winston.transports.Console({
    level: 'debug',
    format: format.combine(
      format.colorize({ level: true, colors: logLevels.colors }),
      defaultFormat
    ),
  }),
  new winston.transports.File({
    filename: 'logs/errors.log',
    level: 'warn',
    format: format.combine(defaultFormat, format.align()),
  }),
];

const logger = createLogger({
  levels: logLevels.levels,
  level: 'info',
  format: defaultFormat,
  transports,
});

export default logger;
