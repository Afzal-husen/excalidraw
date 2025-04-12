import express from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/v1", router);
app.use(errorHandler);

app.listen(3001, () => console.log("server running at port 3001"));

app.get("/", (req, res) => {
  res.send("Hello world");
});
