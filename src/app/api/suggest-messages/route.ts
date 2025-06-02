import OpenAI from "openai";
export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
  try {
    const token = process.env.OPENAI_API_KEY;
    console.log("API Key exists:", !!token);

    const defaultPrompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    console.log("default:", defaultPrompt);
    const body = await req.json();
    const prompt: string = body.prompt || defaultPrompt;

    const client = new OpenAI({
      baseURL: "https://models.github.ai/inference",
      apiKey: token,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await client.chat.completions.create({
            model: "openai/gpt-4o",
            messages: [
              { role: "system", content: prompt },
              { role: "user", content: "" },
            ],
            temperature: 1,
            max_tokens: 4096,
            top_p: 1,
            stream: true,
          });

          let receivedText = ""; // Track all received content

          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            console.log(content);
            if (content) {
              receivedText += content; // Accumulate
              controller.enqueue(encoder.encode(content));
            }
          }

          console.log("TOTAL RECEIVED TEXT:", receivedText); // Verify ALL data
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in suggest-messages", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
