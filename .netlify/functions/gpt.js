export default async (req, context) => {
  const body = await req.json();
  const prompt = body.prompt || "삼성전자 종목을 분석해줘";

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "당신은 최고의 주식 애널리스트입니다." },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
    }),
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};
