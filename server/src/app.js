import express from "express";
// import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// dotenv.config();
import { dbConnection } from "./config/db/connect.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import AppConfig from "./config/app.config.js";
import eventRouter from "./routes/event.js";
import locationRouter from "./routes/location.js";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));

app.use(
  cors({
    origin: AppConfig.corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // access-control-allow-credentials:true
  })
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/locations", locationRouter);


app.get("/", (_, res) => {
  res.json({ 
    message: `Hi!, this is event management app server`,
    date_time: new Date().toLocaleString(),
    github_link: "https://github.com/anishvermaishere",
    author: "Anish"
  });
});

dbConnection();

export default app;
