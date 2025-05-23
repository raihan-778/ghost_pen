import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = _user._id || new mongoose.Types.ObjectId(_user._id); // user._id is a string here & it is ok when you use findById or findByIdAndUpdate. But if you use mongodb aggrigation pipeline, you need to convert it to ObjectId. So, you can use mongoose.Types.ObjectId(user._id) to convert it to ObjectId.

  try {
    const user = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: "messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No User found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: user[0].messages,
      },
      { status: 404 }
    );
  } catch (error) {
    console.error("An Unexpected Error Occured", error);

    return Response.json(
      {
        success: false,
        message: "An Unexpected Error Occured",
      },
      { status: 500 }
    );
  }
}
