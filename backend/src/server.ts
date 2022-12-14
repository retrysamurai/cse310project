import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./libraries/Logging";

import historyRoutes from "./routes/History";
import paybillRoutes from "./routes/Paybill";
import transactionRoutes from "./routes/Transaction";
import userRoutes from "./routes/User";

const router = express();

// Connect to MongoDB
mongoose
  .set("strictQuery", true)
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Connected to MongoDB");
    startServer();
  })
  .catch((err) => {
    Logging.error("Unable to connect");
    Logging.error(err);
  });

// Start server only when MongoDB connects
const startServer = () => {
  router.use((req, res, next) => {
    // Log the request
    let logger = `Incoming -> Method: [${req.method}] - URL: ["${req.url}"]`;
    Logging.info(logger);
    res.on("finish", () => {
      // Log the request
      Logging.info(`${logger} - Status: [${res.statusCode}]`);
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  // Rules of the API
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }

    next();
  });

  // Routes
  router.use("/histories", historyRoutes);
  router.use("/paybills", paybillRoutes);
  router.use("/transactions", transactionRoutes);
  router.use("/users", userRoutes);

  // Healthcheck
  router.get("/ping", (req, res, next) => res.status(200).json({ message: "pong" }));

  // Error handling
  router.use((req, res, next) => {
    const error = new Error("Route not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  // Create server
  http.createServer(router).listen(config.server.port, () => {
    Logging.info(`Server running on ${config.server.port}`);
  });
};
