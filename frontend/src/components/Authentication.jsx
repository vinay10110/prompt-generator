import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { useState } from 'react';
const Authentication = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleSubmit=async()=>{
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });
        
          if (error) console.error('Error signing up:', error.message);
          else {console.log('Signed up successfully:', data);
            handleSignUp(data.user.id,data.user.email,data.user.created_at)
          }
    }
    const handleSignUp=async(user_id,email,created_at)=>{
        const response=await fetch('http://localhost:8080/prompts',{
method:'POST',
body:JSON.stringify({user_id,email,created_at}),
headers:{
    'content-type':'application/json'
}
        })
        console.log(response.json());
    }
  return (
    <div>
      <input type="email" placeholder='Enter your email' onChange={ev=>setEmail(ev.target.value)}/>

      <input type="password" placeholder='Enter your password' onChange={ev=>setPassword(ev.target.value)}/>
      <button type='submit' onClick={handleSubmit}>submit</button>
    </div>
  )
}

export default Authentication
