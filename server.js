//db name cash-flow
import express from "express";
import { connect } from "./models/db.js";
import dotenv from "dotenv";
dotenv.config();

import { router as UserRouter } from "./routes/user.router.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/user/records", UserRouter);

app.listen(port, async () => {
  console.log(`server is listening on port ${port}`);
  await connect();
});
