"use client";
import { useState } from "react";

export default function JarvisPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendToJarvis = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse("");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
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

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Pas de réponse.";
    setResponse(reply);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🤖 Assistant Jarvis</h1>
      <textarea
        rows={4}
        placeholder="Pose ta question à Jarvis..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", padding: "1rem", marginBottom: "1rem" }}
      />
      <button onClick={sendToJarvis} disabled={loading} style={{ padding: "0.5rem 1rem" }}>
        {loading ? "Jarvis réfléchit..." : "Envoyer"}
      </button>
      {response && (
        <div style={{ marginTop: "1rem", background: "#eee", padding: "1rem", borderRadius: 6 }}>
          <strong>Jarvis : </strong> {response}
        </div>
      )}
    </div>
  );
}
