import User, { IUser } from "../models/user.model";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
  create(user: Partial<IUser>): Promise<IUser>;
}

export class UserMongoRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username });
  }

  async create(user: Partial<IUser>): Promise<IUser> {
    return User.create(user);
  }
}
