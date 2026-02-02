
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import { RegisterPayload, LoginPayload, CurrentUserResponse } from "./types";
import { AppError } from "../../utils/AppError";

const JWT_SECRET = process.env.JWT_SECRET!

// -------------------- REGISTER --------------------
 const registerUser = async (payload: RegisterPayload) => {
  const { name, email, password, role } = payload;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already registered");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Assign role safely
  let userRole: Role = Role.STUDENT;
  if (role && role.toUpperCase() === "TUTOR") userRole = Role.TUTOR;

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: userRole,
      status: UserStatus.ACTIVE,
      emailVerified: false,
    },
  });

  // Sign JWT
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { user, token };
};

// -------------------- LOGIN --------------------
const loginUser = async (payload: LoginPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (user.status === UserStatus.BANNED) {
    throw new Error("User is banned");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // ✅ Remove password before returning user
  const { password: _password, ...safeUser } = user;

  return {
    user: safeUser,
    token,
  };
};


// -------------------- GET CURRENT USER --------------------
const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      profileAvater:true,
      studentBookings:true,
      reviewsGiven:true,
      tutorProfile: {
        select: {
          id: true,
          bio: true,
          categoryId: true,
          category: true,
          hourlyRate: true,
          subjects:true,
          availability:true
        },
      },
    },
  });

  if (!user) throw new Error("User not found");
  
  return user 
};


const isUserExist = async (userId:string,model:string) =>{
  switch (model) {
    case "USER":
      const user = await prisma.user.findUnique({
        where:{id:userId}
      });
    if(!user){
      throw new AppError("user not found")
    }
    break;
    
    case "TUTOR":
      const tutor = await prisma.tutorProfile.findUnique({
        where:{id:userId}
      });
      if(!tutor){
        throw new AppError("tutor profilr not found")
      }
      
      default:
        return null
      }
    }

    export const authServices = {isUserExist,registerUser,loginUser,getCurrentUser}