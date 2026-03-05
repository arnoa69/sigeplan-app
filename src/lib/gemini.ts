import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const analyzeConstructionPlan = async (fileBase64: string, mimeType: string) => {
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please configure it in the Secrets panel.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Analyze this construction plan or email thread. 
    Extract the following information in JSON format:
    - projectName: The name of the construction project
    - clientName: The name of the client (Bauherr)
    - location: The address or location of the construction site
    - startDate: Estimated start date (YYYY-MM-DD)
    - endDate: Estimated end date (YYYY-MM-DD)
    - trades: List of involved trades (Gewerke)
    - description: A brief summary of the project scope
  `;

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash", // Using flash for speed and PDF support
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: fileBase64.split(',')[1] || fileBase64,
              mimeType: mimeType
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projectName: { type: Type.STRING },
          clientName: { type: Type.STRING },
          location: { type: Type.STRING },
          startDate: { type: Type.STRING },
          endDate: { type: Type.STRING },
          trades: { type: Type.ARRAY, items: { type: Type.STRING } },
          description: { type: Type.STRING },
        },
        required: ["projectName", "clientName", "location"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
