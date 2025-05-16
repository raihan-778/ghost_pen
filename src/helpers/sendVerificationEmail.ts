import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });
    return {
      success: true,
      message: " verification email send successfully",
    };
  } catch (emailError) {
    console.error("Error sending email:", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
