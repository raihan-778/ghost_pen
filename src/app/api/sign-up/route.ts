import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  const connetion = dbConnect();

  try {
    const { email, username, password } = await request.json();

    const existingUserVerifiedByUserName = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUserName) {
      return Response.json({
        success: false,
        message: "Username already taken",
        status: 400,
      });
    }

    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    if (existingUserByEmail) {
      //   true; //TODO: back Here
    }
  } catch (error) {
    console.error("Error Registring Email", error);

    return Response.json({
      succsee: false,
      message: "Error Registring User",
      status: 500,
    });
  }
}
