import * as logger from "logger";
import { initializeWebServer } from "./entry-points/api/server";
import { AppError, errorHandler } from "@practica/error-handling";

// ⚠️❗️ The example app is very simplistic now and lacks many good practices. Consider visiting
// again in 2-3 months
async function start() {
  // 🦉 Array of entry point is being used to support more kinds like message queue, scheduled job,
  return Promise.all([initializeWebServer()]);
}

start()
  .then((startResponses) => {
    logger.info(`The app has started successfully ${startResponses}}`);
  })
  .catch((error) => {
    // ️️️✅ Best Practice: A failure during startup is catastrophic and should lead to process exit (you may retry before)
    errorHandler.handleError(
      new AppError("startup-failure", error.message, 500, false)
    ); //TODO: Include the origin error as a child (cause) of the generated error
  });
