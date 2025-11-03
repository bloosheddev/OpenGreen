import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCBySflVgX-YF5CDwwYq-RHHuS-JYE0Xi4");

async function textPrompt() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = "Explain Comp Science in 1 Paragraph!";

  const result = await model.generateContent(prompt);

  console.log(result.response.text());
}

// simple_url_analyzer.js
// Minimal Gemini Image Analyzer with an ONLINE IMAGE URL
// Usage:
//   node simple_url_analyzer.js "https://example.com/image.jpg"

const MODEL = "gemini-2.5-flash";
const PROMPT = `
Analyze this image and return ONLY valid JSON with:
{
  "caption": string,
  "labels": [string],
  "text": string
}
`;

async function analyzeImageUrl(url) {
  const apiKey = "AIzaSyCBySflVgX-YF5CDwwYq-RHHuS-JYE0Xi4";
  if (!apiKey)
    throw new Error("Set GOOGLE_API_KEY environment variable first.");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL });

  const result = await model.generateContent([{ text: PROMPT }]);

  const output = result.response.text();
  try {
    return JSON.parse(output);
  } catch {
    throw new Error("Model did not return valid JSON:\n" + output);
  }
}

(async () => {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: node simple_url_analyzer.js IMAGE_URL");
    process.exit(1);
  }

  // try {
  //   const res = await analyzeImageUrl(url);
  //   console.log(JSON.stringify(res, null, 2));
  // } catch (err) {
  //   console.error("Error:", err.message);
  // }
})();

analyzeImageUrl(
  "https://upload.wikimedia.org/wikipedia/commons/7/7b/Ahmad_Sahroni.jpg"
);
