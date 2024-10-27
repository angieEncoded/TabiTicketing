const path = require('path');
const errorDir = path.join(path.dirname(require.main.filename), 'logs', '_errorlogs');
const infoDir = path.join(path.dirname(require.main.filename), 'logs', '_infologs');
const exceptionsDir = path.join(path.dirname(require.main.filename), 'logs', '_exceptionlogs');
const debugDir = path.join(path.dirname(require.main.filename), 'logs', '_debuglogs');

const winston = require("winston");
require('winston-daily-rotate-file');

// Log Errors
const transportErrorsToFile = new (winston.transports.DailyRotateFile)({
    filename: 'tcrm-error-%DATE%.log',
    level: 'error',
    dirname: errorDir,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '300'
})

// Log informational and above events
const transportInfoToFile = new (winston.transports.DailyRotateFile)({
    filename: 'tcrm-info-%DATE%.log',
    level: 'info',
    dirname: infoDir,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '300'
})

// Log unhandled exceptions
const transportExceptionsToFile = new (winston.transports.DailyRotateFile)({
    filename: 'tcrm-exceptions-%DATE%.log',
    dirname: exceptionsDir,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '300'
})

// Log everything - debug level stuff
const transportDebugToFile = new (winston.transports.DailyRotateFile)({
    filename: 'tcrm-debug-%DATE%.log',
    dirname: debugDir,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '300'
})


module.exports = logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.prettyPrint()
    ),
    defaultMeta: { service: 'TabiCRM' },
    transports: [
        new winston.transports.Console({ level: 'error' }),
        transportErrorsToFile,
        transportInfoToFile,
        transportDebugToFile
    ],
    exceptionHandlers: [ // catch uncaught exceptions
        new winston.transports.Console(),
        transportExceptionsToFile
    ]
})