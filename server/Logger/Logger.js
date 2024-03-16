import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import winston from "winston";

const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === "info" ? info : false;
});
const warnFilter = winston.format((info, opts) => {
  return info.level === "warn" ? info : false;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: "./logger/combined.log",
    }),
    new winston.transports.File({
      filename: "./logger/error.log",
      level: "error",
      format: winston.format.combine(
        errorFilter(),
        winston.format.timestamp({
          format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./logger/info.log",
      level: "info",
      format: winston.format.combine(
        infoFilter(),
        winston.format.timestamp({
          format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./logger/warn.log",
      level: "warn",
      format: winston.format.combine(
        warnFilter(),
        winston.format.timestamp({
          format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        winston.format.simple()
      ),
    }),
  ],
});


export default logger;