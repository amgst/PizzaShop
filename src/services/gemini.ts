import { GoogleGenAI, Type } from "@google/genai";
import { MENU_ITEMS, MenuItem } from "../data/menu";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getRecommendation(mood: string): Promise<{ recommendation: MenuItem; reasoning: string }> {
  const model = "gemini-3-flash-preview";
  
  const menuContext = MENU_ITEMS.map(item => `${item.name} (${item.category}): ${item.description}`).join('\n');

  const response = await ai.models.generateContent({
    model,
    contents: `The user is feeling: "${mood}". Based on the following menu from "Second Slice", recommend exactly ONE item and explain why it fits their mood.
    
    Menu:
    ${menuContext}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          itemName: { type: Type.STRING },
          reasoning: { type: Type.STRING }
        },
        required: ["itemName", "reasoning"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text || "{}");
    const recommendation = MENU_ITEMS.find(item => item.name === result.itemName) || MENU_ITEMS[0];
    return {
      recommendation,
      reasoning: result.reasoning
    };
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return {
      recommendation: MENU_ITEMS[0],
      reasoning: "I think you'll love our signature pizza!"
    };
  }
}
