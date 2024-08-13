import { useState } from 'react';
import axios from "axios";
import './App.css';
import ReactMarkdown from "react-markdown";
// import './SymptomChecker.css'; 

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false); 

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };


  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  async function generateAnswer(e){
    
    setAnswer("loading....");
   const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBYuCvYv2I34EOpNHfePtxLQDwkNCRVIig" ,
      method:"post" ,
      data: {"contents":[{"parts":[{"text":question}]},
    ],
  },
    });
    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text'])
  }
  
  return (
    <>
      <h1 className="bg-red-300"> Health Care chat AI</h1>
      <textarea className='border rounded w-full' placeholder='ask anything to me..' value={question} onChange={(e) => setQuestion(e.target.value)} cols="30" rows="10"></textarea>
      <button onClick = {generateAnswer}>Generate Answer</button>
      <pre>{answer}</pre>

       

    </>
  )
}

export default App