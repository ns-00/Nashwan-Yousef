import express, { type Express } from "express";
import cors from "cors";
import { createRequire } from "node:module";
import router from "./routes";
import { logger } from "./lib/logger";

const require = createRequire(import.meta.url);

// pino-http is CommonJS, so load it using require.
const pinoHttp = require("pino-http") as (options: {
  logger: typeof logger;
  serializers?: {
    req?: (req: any) => unknown;
    res?: (res: any) => unknown;
  };
}) => any;

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;

