import { NextRequest } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

interface DestinationInfoRequest {
  destination: string;
}

function buildPrompt(destination: string): string {
  return `You are a knowledgeable travel writer. Provide a concise, engaging destination overview for ${destination}.

Respond in exactly this format:

## History
Write 2–3 sentences on the origin, founding, or historical significance of ${destination}.

## Traditions & Culture
Describe 2–3 key local traditions, customs, or cultural norms travelers should know about.

## Travel Tips
Give 3–4 practical, specific tips for visiting ${destination} (transport, etiquette, safety, best neighborhoods, etc.).

## Did You Know?
Share 1–2 surprising or lesser-known facts about ${destination}.

Keep the tone friendly and informative. Be specific to ${destination}, not generic.`;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "AI_NOT_CONFIGURED" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: DestinationInfoRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "INVALID_REQUEST" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { destination } = body;
  if (!destination?.trim()) {
    return new Response(JSON.stringify({ error: "INVALID_REQUEST" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const openai = new OpenAI({
    apiKey,
    baseURL: "https://integrate.api.nvidia.com/v1",
  });

  try {
    const stream = await openai.chat.completions.create({
      model: "google/gemma-7b",
      messages: [{ role: "user", content: buildPrompt(destination) }],
      stream: true,
      max_tokens: 600,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Destination info error:", err);
    return new Response(JSON.stringify({ error: "AI_API_ERROR" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
