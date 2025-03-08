import express from "express";
// import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// dotenv.config();
import { dbConnection } from "./config/db/connect.js";
import authRouter from "./routes/auth/index.js";
import userRouter from "./routes/user/index.js";
import AppConfig from "./config/app.config.js";
import eventRouter from "./routes/event/index.js";
import locationRouter from "./routes/location/index.js";
import categoryRouter from "./routes/category/index.js";
import ticketRouter from "./routes/ticket/index.js";
import inviteeRouter from "./routes/invitee/index.js";
import speakerRouter from "./routes/speaker/index.js";


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
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/invitees", inviteeRouter);
app.use("/api/v1/speakers", speakerRouter);


// createUsers();

app.get("/", (_, res) => {
  res.json({ 
    message: `Hi!, this is Event Sphere Server`,
    github_link: "https://github.com/anishvermaishere",
    author: "Anish"
  });
});

dbConnection();

export default app;
