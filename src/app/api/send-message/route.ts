import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne(username);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "No User found",
        },
        { status: 404 }
      );
    }
    //is user accepting messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          messages: "Sending messages currently disabled",
        },
        { status: 200 }
      );
    }
    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage as Message);

    user.save();

    return Response.json(
      {
        success: true,
        messages: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Adding Messages", error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
