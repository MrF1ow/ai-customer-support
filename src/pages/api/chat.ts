import { NextApiRequest, NextApiResponse } from "next";
import Groq from "groq-sdk";
import { IMessage } from "@/types";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { messages }: { messages: IMessage[] } = req.body;
      console.log("Messages received:", messages);

      if (!messages.every((msg) => msg.role && msg.content)) {
        throw new Error("All messages must include a 'role' and 'content'");
      }

      const chatCompletion = await getGroqChatCompletion(messages);
      console.log("Chat completion response:", chatCompletion);

      const assistantMessage =
        chatCompletion.choices[0]?.message?.content || "No response found";

      res.status(200).json({ role: 'assistant', content: assistantMessage });
    } catch (error: any) {
      console.error("Error fetching assistant response:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch response", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getGroqChatCompletion(messages: IMessage[]) {
  try {
    return groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: messages,
      max_tokens: 100,
      temperature: 1.2,
    });
  } catch (error: any) {
    console.error("Error in getGroqChatCompletion:", error.message);
    throw error;
  }
}
