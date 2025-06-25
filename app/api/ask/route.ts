import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Tu es Jarvis, un assistant IA intelligent et courtois." },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await openaiRes.json();
  const reply = data.choices?.[0]?.message?.content || "Pas de réponse.";
  return NextResponse.json({ reply });
}
