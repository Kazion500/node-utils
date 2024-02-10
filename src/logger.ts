import pinoLogger from "pino";

const logger = pinoLogger({
  msgPrefix: "[gracefulShutdown]: ",
  redact: {
    paths: ["hostname", "pid", "level"],
    remove: true,
  },
});

export { logger };
