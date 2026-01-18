
import { GoogleGenAI, Type } from "@google/genai";
import { BankRate, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const fetchLatestRates = async (): Promise<{ rates: BankRate[], sources: GroundingSource[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Cập nhật bảng lãi suất tiền gửi tiết kiệm mới nhất của 20 ngân hàng tại Hà Tĩnh cho các kỳ hạn 1, 2, 3, 6, 12, 13 tháng. Đặc biệt chú ý tách biệt dữ liệu cho 'Agribank Hà Tĩnh' và 'Agribank Hà Tĩnh II'. Trả về dưới dạng JSON bao gồm tên ngân hàng, mã và lãi suất (%) cho từng kỳ hạn.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            banks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  bankName: { type: Type.STRING },
                  code: { type: Type.STRING },
                  rates: {
                    type: Type.OBJECT,
                    properties: {
                      "1M": { type: Type.NUMBER },
                      "2M": { type: Type.NUMBER },
                      "3M": { type: Type.NUMBER },
                      "6M": { type: Type.NUMBER },
                      "12M": { type: Type.NUMBER },
                      "13M": { type: Type.NUMBER },
                    },
                    required: ["1M", "2M", "3M", "6M", "12M", "13M"]
                  }
                },
                required: ["bankName", "code", "rates"]
              }
            }
          },
          required: ["banks"]
        }
      },
    });

    const data = JSON.parse(response.text || "{}");
    const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web ? { title: chunk.web.title, uri: chunk.web.uri } : null)
      .filter(Boolean) || [];

    const formattedRates = data.banks.map((b: any) => ({
      ...b,
      lastUpdated: new Date().toLocaleDateString('vi-VN')
    }));

    return { rates: formattedRates, sources };
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
};
