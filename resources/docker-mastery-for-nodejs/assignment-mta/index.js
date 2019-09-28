// A legacy app that needs migrated to docker
// Requires node 8.x and GraphicsMagick installed on OS
// It will pull images from a hardcoded dir and output
// to another hardcoded dir and exit
// it defaults to logging to a hardcoded file path

const fs = require('fs');
const gm = require('gm');
const isImage = require('is-image');
const winston = require('winston');

const inDir = './in';
const outDir = './out';
const logDir = './logs';
const charcoalFactor = process.env.CHARCOAL_FACTOR || 1.0;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    // new winston.transports.File({ filename: logDir + '/error.log', level: 'error' }),
    // new winston.transports.File({ filename: logDir + '/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

logger.log('info', 'about to start');

function findFiles(dir, output, cFactor) {
  logger.log('info', 'about to scan ' + dir);
  fs.readdir(dir, function (err, files) {
    if (err) {
      logger.log('error', err);
      return;
    }
    files.forEach(function (file) {
      if (isImage(file)) {
        logger.log('info', 'found file ' + dir + '/' + file);
        logger.log('info', 'working on it, I\'m old and slow');
        gm(dir + '/' + file)
          .charcoal(cFactor)
          .write(output + '/out-' + file, function (err) {
            if (err) {
              logger.log('error', err);
              return;
            }
            if (!err) logger.log('info', 'image ' + file + ' resized');
          });
      }
    });
  });
}

findFiles(inDir, outDir, charcoalFactor);
