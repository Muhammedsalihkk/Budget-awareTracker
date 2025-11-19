import {User} from "../models/index"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

const authService = {
  registerUserService: async ( email: string, password: string) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const hashedpassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashedpassword,
      })

      return user;
    } catch (error) {
      throw error;
    }
  },

  loginUserService: async (email: string, password: string) => {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not exists");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("password is incorrect");

      const token = generateToken(user.id);

      return { user, token };
    } catch (error) {
      throw error;
    }
  },
    getProfileService: async (userId: string) => {
    try {
      const user = await User.findById(userId).select("-password"); 

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
