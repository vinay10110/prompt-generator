import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {
  createUser,
  createUserPrompt,
  userPromptResponse,
  userPromptInteraction,
  getUserPromptById,
  deleteUserPrompt
} from './database/db.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.post('/prompts', async (req, res) => {
  const { user_id,email, created_at } = req.body;
  try {
    const newPrompt = await createUser(user_id,email,created_at);
    res.status(201).json(newPrompt);
  } catch (error) {
    console.error('Error creating prompt:', error); 
    res.status(500).json({ error: 'Failed to create prompt' });
  }
});

app.post('/prompttext', async (req, res) => {
  const { user_id,prompt_text} = req.body;
  
  try {
    const newPrompt = await createUserPrompt(user_id,prompt_text);
    res.status(201).json(newPrompt);
  } catch (error) {
    console.error('Error creating prompt:', error); 
    res.status(500).json({ error: 'Failed to create prompt' });
  }
});
app.post('/promptresponse', async (req, res) => {
  const { prompt_id,response_text} = req.body;
  
  try {
    const newPrompt = await userPromptResponse(prompt_id,response_text);
    res.status(201).json(newPrompt);
  } catch (error) {
    console.error('Error creating prompt:', error); 
    res.status(500).json({ error: 'Failed to create prompt' });
  }
});
app.post('/promptinteractions', async (req, res) => {
  const { user_id,prompt_id, response_id } = req.body;
  try {
    const newPrompt = await userPromptInteraction(user_id,prompt_id,response_id);
    res.status(201).json(newPrompt);
  } catch (error) {
    console.error('Error creating prompt:', error); 
    res.status(500).json({ error: 'Failed to create prompt' });
  }
});


app.get('/prompts', async (req, res) => {
  const { user_id}  = req.body;
  try {
    const prompt = await getUserPromptById(user_id);
    if (prompt) {
      res.status(200).json(prompt);
    } else {
      res.status(404).json({ error: 'Prompt not found' });
    }
  } catch (error) {
    console.error('Error getting prompt:', error); 
    res.status(500).json({ error: 'Failed to get prompt' });
  }
});

// app.put('/prompts/:id', async (req, res) => {
//   const { id } = req.params;
//   const { userPrompt, response } = req.body;
//   try {
//     const updatedPrompt = await updateUserPrompt(id, userPrompt, response);
//     if (updatedPrompt) {
//       res.status(200).json(updatedPrompt);
//     } else {
//       res.status(404).json({ error: 'Prompt not found' });
//     }
//   } catch (error) {
//     console.error('Error updating prompt:', error); 
//     res.status(500).json({ error: 'Failed to update prompt' });
//   }
// });

app.delete('/prompts', async (req, res) => {
  const { prompt_id } = req.body;
  try {
    await deleteUserPrompt(prompt_id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting prompt:', error); 
    res.status(500).json({ error: 'Failed to  delete prompt' });
  }
});


app.listen(8080, () => {
  console.log('App is listening on port 8080');
});
