export const chatting =  async (req, res) => {
  const { message } = req.body;
  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-2-latest",
        messages: [
          {
            role: "system",
            content: `You are a fitness coach. The user:
                - weight: ${req.body.weight}
                - goal: ${req.body.goal}
                - intolerances: ${req.body.intolerances}
                Give personalized advice.`,
          },
          { role: "user", content: message },
        ],
        //prompt: message, stream:false
      }),
    });
    const data = await response.json();
    console.log(data);
    res.json({ reply: data.response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hiba az AI-al!" });
  }
};