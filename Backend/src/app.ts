import express from "express";
import connectDatabase from "./config/databaseConnection";
import corsMiddleware from "./middlewares/corsMiddleware";
import routes from "./routes/index"
import cookie-parser from "cookie-parser";
const app = express();

connectDatabase();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Body:", req.body);
  next();
});

app.use("/api", routes);

export default app;
