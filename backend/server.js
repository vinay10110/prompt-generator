// server.js or main app file
import express from 'express';
import dotenv from 'dotenv';
import {
  createUserPrompt,
  getUserPrompts,
  getUserPromptById,
  updateUserPrompt,
  deleteUserPrompt
} from './db.js';

const app = express();
dotenv.config();

app.use(express.json());

// Routes for CRUD operations

app.post('/prompts', async (req, res) => {
  const { userPrompt, response } = req.body;
  try {
    const newPrompt = await createUserPrompt(userPrompt, response);
    res.status(201).json(newPrompt);
  } catch (error) {
    console.error('Error creating prompt:', error); // Log the error
    res.status(500).json({ error: 'Failed to create prompt' });
  }
});

app.get('/prompts', async (req, res) => {
  try {
    const prompts = await getUserPrompts();
    res.status(200).json(prompts);
  } catch (error) {
    console.error('Error getting prompts:', error); // Log the error
    res.status(500).json({ error: 'Failed to get prompts' });
  }
});

app.get('/prompts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const prompt = await getUserPromptById(id);
    if (prompt) {
      res.status(200).json(prompt);
    } else {
      res.status(404).json({ error: 'Prompt not found' });
    }
  } catch (error) {
    console.error('Error getting prompt:', error); // Log the error
    res.status(500).json({ error: 'Failed to get prompt' });
  }
});

app.put('/prompts/:id', async (req, res) => {
  const { id } = req.params;
  const { userPrompt, response } = req.body;
  try {
    const updatedPrompt = await updateUserPrompt(id, userPrompt, response);
    if (updatedPrompt) {
      res.status(200).json(updatedPrompt);
    } else {
      res.status(404).json({ error: 'Prompt not found' });
    }
  } catch (error) {
    console.error('Error updating prompt:', error); // Log the error
    res.status(500).json({ error: 'Failed to update prompt' });
  }
});

app.delete('/prompts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserPrompt(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting prompt:', error); // Log the error
    res.status(500).json({ error: 'Failed to  delete prompt' });
  }
});

// Start the server
app.listen(8080, () => {
  console.log('App is listening on port 8080');
});
