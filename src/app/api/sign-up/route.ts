import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, username, password } = await request.json();

    //user by username verification Check

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

    //user by email verification Check

    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "This Email already taken",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpire = new Date(Date.now() + 3600000);

        existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry date to 1 hour from now
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpire: expiryDate,
        isAcceptingMessage: true,
        isVerified: false,
        messages: [],
      });
      await newUser.save();
    }

    //Send verification email

    const emailResponse = await sendVerificationEmail(
      username,
      email,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered successfully.Please Verify Your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Registring Email", error);

    return Response.json({
      succsee: false,
      message: "Error Registring User",
      status: 500,
    });
  }
}
