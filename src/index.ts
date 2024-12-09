import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import UserRouter from "./routes/user";
import ServiceRouter from "./routes/service";
import BookingRouter from "./routes/booking";

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use(ServiceRouter);
app.use(BookingRouter);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;
