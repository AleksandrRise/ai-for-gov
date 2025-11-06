import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";           // ensure Node runtime

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error("Missing GOOGLE_API_KEY");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");
// Use a model you SAW in your ListModels result or tested with curl:
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: Request): Promise<Response> {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "Server missing GOOGLE_API_KEY" },
        { status: 500 }
      );
    }

    const { prompt } = await req.json();
    const text = (prompt ?? "").toString().trim() || "Explain how AI works";

    const result = await model.generateContent(text);
    const out = result.response.text();

    return NextResponse.json({ text: out }); // matches client
  } catch (err: any) {
    console.error("API /generate error:", err?.message || err);
    // Optionally surface more detail for debugging:
    return NextResponse.json(
      { error: err?.message || "Failed to generate content." },
      { status: 500 }
    );
  }
}
