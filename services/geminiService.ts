
import { GoogleGenAI, Type } from "@google/genai";
import { Platform, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeVideoUrl = async (url: string): Promise<AnalysisResult> => {
  // Use Gemini to "simulate" extracting real metadata by interpreting the URL 
  // and providing a high-quality analysis of what the video might be
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this social media URL: ${url}. Provide realistic metadata and download options for it.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          metadata: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              thumbnail: { type: Type.STRING },
              duration: { type: Type.STRING },
              author: { type: Type.STRING },
              platform: { type: Type.STRING, enum: Object.values(Platform) }
            },
            required: ["title", "author", "platform"]
          },
          options: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                quality: { type: Type.STRING },
                format: { type: Type.STRING },
                size: { type: Type.STRING },
                url: { type: Type.STRING }
              }
            }
          }
        },
        required: ["metadata", "options"]
      }
    }
  });

  const data = JSON.parse(response.text || '{}');
  
  // Ensure we have a valid thumbnail if Gemini didn't provide a good one
  if (!data.metadata.thumbnail || data.metadata.thumbnail.includes('example.com')) {
    data.metadata.thumbnail = `https://picsum.photos/seed/${Math.random()}/800/450`;
  }
  
  data.metadata.url = url;
  return data as AnalysisResult;
};
