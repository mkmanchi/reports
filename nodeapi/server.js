const express = require("express");
const cors = require("cors");

const { errorHandler } = require("./middlewares/errorMiddleware");
const reportsRoutes = require("./routes/reports.router");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();

apiRouter.use("/reports", reportsRoutes);

app.use(`/api/v${process.env.API_VERSION}`, apiRouter);

app.use(errorHandler);

app
  .listen(process.env.PORT || 3002, () => {
    console.log(`Server started on port ${process.env.PORT || 3002}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use.`);
      process.exit(1);
    } else {
      throw err;
    }
  });
