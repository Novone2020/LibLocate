// Libraries
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

// files
import { userAuthRouter } from "./routes/userAuthRouter.js";
import { postRouter } from "./routes/post.js";

// locate
import { frontCompRouter } from "./routes/locateRoute/FrontComputers.js";
import { boxesRouter } from "./routes/locateRoute/boxes.js";
import { backBoxesRouter } from "./routes/locateRoute/backBoxes.js";
import { backBoxesTablesRouter } from "./routes/locateRoute/backBoxesTables.js";
import { tableWallRouter } from "./routes/tableSection/tableWall.js";
import { rightWallRouter } from "./routes/tableSection/rightWall.js";
import { nonElecTableRouter } from "./routes/tableSection/nonElecTable.js";

// Dotenv
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Environmentals
const PORT = process.env.PORT;
const link_DB = process.env.link_DB;
const meNahiBataunga = process.env.apiStart;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use(cors());

app.get("/ping", (req, res) => {
  res.json({ ready: true });
});


// APIs
app.use(meNahiBataunga, userAuthRouter);
app.use(meNahiBataunga, postRouter);

// Locate Left Section
app.use(meNahiBataunga, frontCompRouter);
app.use(meNahiBataunga, boxesRouter);
app.use(meNahiBataunga, backBoxesRouter);
app.use(meNahiBataunga, backBoxesTablesRouter);

// Locate Right Section
app.use(meNahiBataunga, tableWallRouter);
app.use(meNahiBataunga, rightWallRouter);
app.use(meNahiBataunga, nonElecTableRouter);

// MongoDb Connection
mongoose
  .connect(link_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected!!");

    app.listen(PORT, () => {
      console.log("OUR SERVER IS RUNNING!!");
    });
  })
  .catch((error) => {
    console.log("Connection Failed !!");
    console.log(error);
  });
