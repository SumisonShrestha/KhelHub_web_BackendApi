import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoute from "./routes/user.route";
import { HttpException } from "./exceptions/http-exception";
import { ApiResponseHelper } from "./utils/api-response";

const app: Application = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/v1/auth", userRoute);

// ── 404 ─────────────────────────────────────────────────────────────────────
app.use((req: Request, res: Response) => {
  return res.status(404).json({ message: "Route not found" });
});

// ── Global Error Handler ─────────────────────────────────────────────────────
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    return ApiResponseHelper.error(res, err.message, err.status);
  }
  return ApiResponseHelper.error(res, err?.message || "Internal Server Error", 500);
});

export default app;
