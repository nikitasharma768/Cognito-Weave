export default {
  async fetch(request, env) {
    try {
      const { prompt, system, model, temperature, top_p } = await request.json();

      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GOOGLE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            system_instruction: { parts: [{ text: system || "" }] },
            generationConfig: {
              temperature: temperature || 0.6,
              topP: top_p || 0.9,
            },
          }),
        }
      );

      const data = await r.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return new Response(JSON.stringify({ text }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
