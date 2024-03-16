import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import Limiter from "./Ratelimiter/RateLimiter.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import Mongo from "./database/MongoDB.js";
import FileRoutes from "./routes/FileRoute.js";
import fileUpload from "express-fileupload";
import VerifyRoutes from "./routes/VerifyRoutes.js";
import path from "path";
import UserRoutes from "./routes/UserRoutes.js";

const port = process.env.PORT;
const app = express();


// database
Mongo();

//
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: true,
    methods: ["PUT", "GET", "POST", "DELETE", "HEAD"],
    credentials: true,
  })
);
app.use("/image", express.static(path.join("./public/files")));
app.use(Limiter);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "server working properly",
  });
});



// api
app.use("/api/auth", AuthRoutes);
app.use("/api/file", FileRoutes);
app.use("/api/verify", VerifyRoutes);
app.use("/api/auth/user", UserRoutes);



// error handling

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "server not respond !";
  const success = err.success || false;

  return res.status(status).json({
    status,
    message,
    success,
  });
});

app.listen(port, () => {
  console.log(`server start at the port of ${port}`);
});
