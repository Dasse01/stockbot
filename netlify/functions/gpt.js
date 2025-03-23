const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body || "{}");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: body.prompt }],
  });

  return {
    statusCode: 200,
    body: JSON.stringify(completion.data.choices[0].message),
  };
};
