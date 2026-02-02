
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateServiceDescription(serviceName: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a concise 1-line professional sales description for an SMM service called "${serviceName}". Include emojis.`,
    });
    return response.text || "Quality service with fast delivery.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Premium quality service for your social growth.";
  }
}
