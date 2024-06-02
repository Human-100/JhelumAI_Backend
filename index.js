
const express = require('express'); 
const cors = require('cors')
require("dotenv").config();
const API_KEY = process.env.API_KEY


const app = express(); 
const PORT = process.env.PORT || 4000; 
  
app.use(cors());



const { GoogleGenerativeAI } = require("@google/generative-ai");


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);
console.log(API_KEY)

async function run(request) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = request

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text,'in function');
  return  text;
}



app.get('/:requests', async(req, res)=>{
  let request = req.params.requests.toString()
  let text = await run(request);
  console.log(text,'after call')
  res.status(200); 
  res.send({"message":text}); 

}); 


app.listen(PORT)
