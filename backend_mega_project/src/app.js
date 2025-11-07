import express from "express";
import cros from "cros";
import cookieParse from "cookie-parser";

const app = express();

app.use(
  cros({
    origin: process.env.CROS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.unsubscribe(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.unsubscribe(express.static("public"));

export { app };
