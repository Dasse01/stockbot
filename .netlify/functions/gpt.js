const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  const { prompt } = JSON.parse(event.body || "{}");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "당신은 최고의 주식 애널리스트입니다." },
        { role: "user", content: prompt }
      ],
      temperature: 0.6
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ result: completion.data.choices[0].message.content })
    };
  } catch (err) {
    console.error("OpenAI 오류:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "OpenAI 호출 실패" })
    };
  }
};
