import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserMongoRepository } from "../repositories/user.repository";
import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import { HttpException } from "../exceptions/http-exception";
import { SECRET_KEY } from "../config/constant";

const userRepository = new UserMongoRepository();

export class UserService {
  async createUser(userData: CreateUserDto) {
    // Duplicate checks
    const existingByUsername = await userRepository.findByUsername(userData.username);
    if (existingByUsername) throw new HttpException(400, "Username already exists");

    const existingByEmail = await userRepository.findByEmail(userData.email);
    if (existingByEmail) throw new HttpException(400, "Email already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createdUser = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return createdUser;
  }

  async loginUser(loginData: LoginUserDto) {
    const user = await userRepository.findByEmail(loginData.email);
    if (!user) throw new HttpException(400, "Invalid email or password");

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) throw new HttpException(400, "Invalid email or password");

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "30d" }
    );

    // Return user without the password
    const { password: _, ...safeUser } = user.toObject();
    return { user: safeUser, token };
  }
}
