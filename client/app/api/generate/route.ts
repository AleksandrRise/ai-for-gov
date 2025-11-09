import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

export const runtime = "nodejs";

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error("Missing GOOGLE_API_KEY");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function readCsvPreview(filePath: string, label: string, limit = 50): Promise<string> {
  if (!fs.existsSync(filePath)) {
    return `Dataset: ${label}\nStatus: file not found`;
  }

  const stream = fs.createReadStream(filePath, { encoding: "utf8" });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let header = "";
  const rows: string[] = [];
  let lineIndex = 0;

  for await (const line of rl) {
    if (lineIndex === 0) header = line;
    else if (rows.length < limit) rows.push(line);
    else break;
    lineIndex++;
  }

  rl.close();
  stream.close();

  return [
    `Dataset: ${label}`,
    `Header: ${header}`,
    `First ${rows.length} rows:`,
    rows.join("\n"),
  ].join("\n");
}

// extra safety: strip filenames, paths, and *.csv mentions
function redactFilenames(s: string) {
  return s
    .replaceAll(/([A-Za-z]:)?[\\/][^\s]*\.(csv|tsv|json)/gi, "")
    .replaceAll(/dataset\s*\d+\.(csv|tsv|json)/gi, "")
    .replaceAll(/\s{2,}/g, " ")
    .trim();
}

export async function POST(req: Request): Promise<Response> {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "Server missing GOOGLE_API_KEY" },
        { status: 500 }
      );
    }

    const { prompt } = await req.json();
    const userPrompt = (prompt ?? "").toString().trim();

    // place your files in <project root>/data/
    const csvA = path.join(process.cwd(), "app", "data", "dataset1.csv");
    const csvB = path.join(process.cwd(), "app", "data", "dataset2.csv");
    const csvC = path.join(process.cwd(), "app", "data", "dataset3.csv");

    const [aPreview, bPreview, cPreview] = await Promise.all([
      readCsvPreview(csvA, "Dataset 1", 50),
      readCsvPreview(csvB, "Dataset 2", 50),
      readCsvPreview(csvC, "Dataset 3", 50),
    ]);

    const baseInstruction =
      "Write a clear plain text answer. Do not include any filenames, paths, or dataset names. Refer to datasets only as Dataset 1, Dataset 2, and Dataset 3. Do not use any styling symbols.";

    const text = [
      userPrompt || "Analyze the request using the datasets below.",
      baseInstruction,
      "Dataset context begins.",
      aPreview,
      bPreview,
      cPreview,
      "Dataset context ends.",
    ].join("\n");

    const result = await model.generateContent(text);
    const raw = result.response.text();
    const out = redactFilenames(raw);

    return NextResponse.json({ text: out });
  } catch (err: any) {
    console.error("API /generate error:", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "Failed to generate content." },
      { status: 500 }
    );
  }
}
