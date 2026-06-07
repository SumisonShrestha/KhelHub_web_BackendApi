import { Request, Response } from "express";
import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { ApiResponseHelper } from "../utils/api-response";
import { HttpException } from "../exceptions/http-exception";

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    console.log("BODY:", req.body);
    try {
      const parsed = CreateUserDto.safeParse(req.body);
      if (!parsed.success) {
        const messages = parsed.error.errors.map(e => e.message).join(", ");
        throw new HttpException(400, messages);
      }
      const user = await userService.createUser(parsed.data);
      return ApiResponseHelper.success(res, user, 201, "User registered successfully");
    } catch (e: any) {
      return ApiResponseHelper.error(res, e?.message || "Registration failed", e?.status || 500);
    }
  }

  async login(req: Request, res: Response) {
    console.log("BODY:", req.body);
    try {
      const parsed = LoginUserDto.safeParse(req.body);
      if (!parsed.success) {
        const messages = parsed.error.errors.map(e => e.message).join(", ");
        throw new HttpException(400, messages);
      }
      const { user, token } = await userService.loginUser(parsed.data);
      return ApiResponseHelper.success(res, { user, token }, 200, "Login successful");
    } catch (e: any) {
      return ApiResponseHelper.error(res, e?.message || "Login failed", e?.status || 500);
    }
  }
}