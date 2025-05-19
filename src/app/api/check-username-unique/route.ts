import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UserNameQuerySechema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const quaryParam = { username: searchParams.get("username") };

    //validate with zod
    const result = UserNameQuerySechema.safeParse(quaryParam);
    console.log("result", result); //TODO:  remove this line

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(",")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        { status: 409 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      { status: 405 }
    );
  } catch (error) {
    console.error("Error Checking username", error);

    return Response.json(
      {
        success: false,
        message: "Error Checking username",
      },
      { status: 500 }
    );
  }
}
