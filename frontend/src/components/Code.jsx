import { useState } from "react";


const Code = () => {
    const [text,setText]=useState();
    const [prompt,setPrompt]=useState();
    const handleveal=async()=>{
        const {available } = await ai.languageModel.capabilities();

if (available !== "no") {
  const session = await ai.languageModel.create();
  const result = await session.prompt(`${prompt}`);
  setText(result);
}
const response=await fetch('http://localhost:8080/prompts',{
  method:'POST',
  body:JSON.stringify({user_id:2,prompt,text})
});
const result=response.json();
console.log(result);


    }
   
  return (
    <div>
      <input type="text" placeholder="Enter a prompt" onChange={ev=>setPrompt(ev.target.value)}/>
      <button onClick={handleveal}>submit</button>
      {text}
    </div>
  )
}

export default Code
