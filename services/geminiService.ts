import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In production, ensure this is handled securely

const ai = new GoogleGenAI({ apiKey });

export const getZenGuidance = async (userQuestion: string): Promise<string> => {
  try {
    if (!apiKey) return "请配置 API Key 以启用智能护法功能。";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuestion,
      config: {
        systemInstruction: `
          你是一位多伦多大觉寺（Manju Wisdom Buddhist Institute）的'智能护法'（AI助手）。
          你的语气庄严、慈悲、平和，富有智慧，但又非常亲切易懂。
          
          关于大觉寺：
          - 位于多伦多，致力于弘扬清净圆满教法。
          - 英文名称为 Manju Wisdom Buddhist Institute。
          - 提供研讨、共修、法会、禅修等活动，以及系统的佛学课程（经典导读、佛教音乐、禅修指导）。
          - 旨在培养正知正见的佛弟子。
          
          你的任务：
          1. 回答用户关于佛教基础知识的问题。
          2. 介绍寺院的课程和法务活动。
          3. 引导用户生起慈悲心和智慧。
          4. 如果用户询问捐款，请礼貌地引导他们去网站的'功德护持'页面。
          
          回答要精简，富有禅意，不要过于冗长。
        `,
        temperature: 0.7,
      }
    });

    return response.text || "阿弥陀佛，小僧暂时无法回答，请稍后再试。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "阿弥陀佛，网络连接似乎有些波动，请稍后再试。";
  }
};