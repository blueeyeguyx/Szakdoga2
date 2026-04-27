
export const chatController = async (req, res) => {
  const {message} = req.body;
  try{
    const response = await fetch("https://api.openai.com/v1/chat/completions", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: `You are a helpful fitness and diet assistant. The user: 
            -weight: ${req.body.weight}
            -goal: ${req.body.goal}
            -intolerances: ${req.body.intolerances} 
            Give personalized advice. ` },
          { role: "user", content: message }
        ]
      })
    });
    
    const data = await response.json();
    res.json({
      reply: data.choices[0].message.content
    });
  }catch(err){
    console.error(err);
    res.status(500).json({error: "AI error"});
  }
}; 