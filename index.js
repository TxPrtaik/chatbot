let express=require('express');
let bodyparser=require('body-parser');
let app=express();
let cors=require('cors');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
const { GoogleGenerativeAI } = require("@google/generative-ai");
app.use(cors());
const genAI = new GoogleGenerativeAI("AIzaSyD7WX7NLlsId1j7KV6rjyK3wjj4HwC6u9Y");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/",(req,res)=>{
    res.render('index.ejs');
})
// app.post("/message",async(req,res)=>{
//     const chatCompletion = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: req.body.message }],
//     })
//     response.send(chatCompletion.choices[0].message);
// })
app.get("/a",async(req,res)=>{
    const prompt = "hello ";

    const result = await model.generateContent(prompt);
    
    res.send(result.response.text())
})
app.post("/get-msg",async(req,res)=>{
let r=await model.generateContent(req.body.message);
res.send(r.response.text());
})
app.listen(1010);