import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
export const recommendation = async (req, res) => {
    try {
      const { location } = "Raipur chhattisgarh";
      const completion = await openai.createCompletion({ 
        model: "text-davinci-003",
        prompt: `List tourist spots in Chhattisgarh near ${location}`, 
      });
      console.log(completion);
      return (completion.data.choices[0].message.content);
    //   const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    //     prompt: `List tourist spots in Chhattisgarh near ${location}`,
    //     max_tokens: 64,
    //     temperature: 0.6,
    //     n: 3,
    //   }, {
    //     headers: {
    //       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //   });
  
    //   // Extract the generated text from OpenAI's response
    //   const generatedText = response.data.choices[0].text.trim();
  
    //   // Extract tourist spots from the generated text
    //   const touristSpots = generatedText.split('\n').map((spot) => {
    //     const [name, image, description] = spot.split('|').map((item) => item.trim());
    //     return { name, image, description };
    //   });
  
    //   res.json({ touristSpots });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred' });
    }
  };