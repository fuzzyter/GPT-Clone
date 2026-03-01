import { Configuration, OpenAIApi } from "openai";

let openaiClient = null;
let useElectronMain = false;

export const initializeOpenAI = async () => {
  try {
    const isElectron =
      typeof window !== "undefined" &&
      window.electron &&
      typeof window.electron.getApiKey === "function";

    if (isElectron) {
      const apiKey = await window.electron.getApiKey();
      if (!apiKey) {
        console.error("Missing OPENAI_API_KEY in main process (.env)");
        return false;
      }
      if (typeof window.electron.chatCompletion !== "function") {
        console.error(
          "Preload missing chatCompletion — restart Electron after updating preload.js"
        );
        return false;
      }
      useElectronMain = true;
      return true;
    }

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      console.error("Missing VITE_OPENAI_API_KEY (browser-only dev)");
      return false;
    }
    openaiClient = new OpenAIApi(new Configuration({ apiKey }));
    return true;
  } catch (error) {
    console.error("Failed to initialize OpenAI:", error);
    return false;
  }
};

export const sendMessageToAI = async (messages) => {
  if (useElectronMain && window.electron?.chatCompletion) {
    const result = await window.electron.chatCompletion(
      messages,
      "gpt-3.5-turbo"
    );
    if (!result?.ok) {
      const extra =
        result?.status === 429
          ? " (429: exceed)"
          : "";
      console.error("OpenAI (main):", result?.error, result?.status);
      throw new Error((result?.error || "OpenAI request failed") + extra);
    }
    return result.content;
  }

  if (!openaiClient) {
    throw new Error("OpenAI client not initialized");
  }

  try {
    const response = await openaiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    return (
      response?.data?.choices?.[0]?.message?.content ?? "No response from AI"
    );
  } catch (error) {
    const detail =
      error?.response?.data?.error?.message ||
      error?.message ||
      error;
    console.error("OpenAI API error:", detail);
    throw new Error(
      typeof detail === "string" ? detail : "Failed to get response from AI"
    );
  }
};
