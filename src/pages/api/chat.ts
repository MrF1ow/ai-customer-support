import { NextApiRequest, NextApiResponse } from 'next';
import Groq from "groq-sdk";
import * as dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { messages }: { messages: Message[] } = req.body;
      console.log('Messages received:', messages); // Log received messages

      const chatCompletion = await getGroqChatCompletion(messages);
      console.log('Chat completion response:', chatCompletion); // Log the response from Groq API

      const assistantMessage = chatCompletion.choices[0]?.message?.content || 'No response found';

      res.status(200).json({ message: assistantMessage });
    } catch (error: any) {
      console.error('Error fetching assistant response:', error);
      res.status(500).json({ error: 'Failed to fetch response', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getGroqChatCompletion(messages: Message[]) {
  try {
    return groq.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: messages,
      max_tokens: 100,
      temperature: 1.2,
    });
  } catch (error: any) {
    console.error('Error in getGroqChatCompletion:', error.message);
    throw error;
  }
}
