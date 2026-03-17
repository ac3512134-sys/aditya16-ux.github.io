import { NextResponse } from "next/server";
import { generateMockContent } from "@/lib/mockAi";

export async function POST(request: Request) {
  const body = await request.json();
  const topic = typeof body?.topic === "string" ? body.topic : "";

  if (!topic.trim()) {
    return NextResponse.json({ error: "Topic is required." }, { status: 400 });
  }

  const content = await generateMockContent(topic);
  return NextResponse.json(content);
}
