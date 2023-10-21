import { logger } from "./logger";

export type ServerService = {
  name: string;
  stop: () => Promise<void>;
};

export interface GracefulShutdownOptions {
  timeout?: number;
  development?: boolean;
  services?: ServerService[];
}

export const gracefulShutdown = (
  signals: NodeJS.Signals[],
  opt: GracefulShutdownOptions
) => {
  const { timeout = 1000, development = false, services = [] } = opt;

  signals.forEach((signal) => {
    process.on(signal, async () => {
      let timer: NodeJS.Timeout;
      logger.info(`Received ${signal}. Starting graceful shutdown.`);

      const promises = services.map((service) => service.stop());

      if (promises.length === 0) {
        logger.info("No services to stop. Exiting process.");
        process.exit(0);
      }

      timer = setTimeout(() => {
        logger.error(
          `Graceful shutdown timed out after ${timeout}ms. Exiting process.`
        );
        process.exit(1);
      }, timeout);

      await Promise.all(promises);

      logger.info("All services stopped. Exiting process.");
      clearTimeout(timer);
      process.exit(0);
    });
  });

  if (development) {
    process.on("uncaughtException", (error) => {
      logger.error("Uncaught exception", error);
      process.exit(1);
    });

    process.on("unhandledRejection", (error) => {
      logger.error("Unhandled rejection", error);
      process.exit(1);
    });
  }
};
