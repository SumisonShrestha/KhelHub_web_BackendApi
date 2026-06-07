import { Response } from "express";

export interface ApiResponse<T> {
  status: number;
  data?: T;
  success: boolean;
  message: string;
}

export class ApiResponseHelper {
  static success<T>(
    res: Response,
    data: T,
    status: number = 200,
    message: string = "Success"
  ) {
    const response: ApiResponse<T> = { status, data, message, success: true };
    return res.status(status).json(response);
  }

  static error(res: Response, message: string = "Error", status: number = 500) {
    const response: Omit<ApiResponse<any>, "data"> = { status, message, success: false };
    return res.status(status).json(response);
  }
}
