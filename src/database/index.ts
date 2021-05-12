import { createConnection } from "typeorm";
require("dotenv").config();

createConnection({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + "/../models/**.ts"],
}).then((connection) => {
  console.log("database connected");
});
