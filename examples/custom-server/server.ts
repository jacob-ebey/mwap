import { createApp as createMwapApp } from "@mwap/express";

export const createApp = (express, args) => {
  const mwapApp = createMwapApp(express, args);

  const app = express();

  app.use((req, res, next) => {
    res.setHeader("custom-server", "true");
    next();
  });

  app.use(mwapApp);

  return app;
};
