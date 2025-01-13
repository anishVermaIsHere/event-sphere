import { createServer } from "node:http";
import app from "./app.js";
import AppConfig from "./config/app.config.js";
import { createUsers } from "./utils/seed.js"


const server = createServer(app);

server.listen(AppConfig.port, AppConfig.host, ()=>{
    console.log(`***** SERVER started at ${AppConfig.host}:${AppConfig.port} *****`);
});


