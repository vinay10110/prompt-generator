import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const isSupabase=process.env.USE_SUPABASE;
const pool = new Pool({
  connectionString:  process.env.DATABASE_URL 
});


(async () => {
  try {
    await pool.connect(); 
    console.log('Connected to the PostgreSQL database.');
    const executeSqlFile = async (filePath) => {
      try {
        const sql = fs.readFileSync(filePath, 'utf8');
        await pool.query(sql);
        console.log('SQL file executed successfully.');
      } catch (error) {
        console.error('Error executing SQL file:', error);
      } 
    };
    executeSqlFile('./database/Schema.sql');
  } catch (error) {
    console.error('Initial connection error:', error.message, error.stack);
    process.exit(1); 
  }
})();


pool.on('error', (error) => {
  console.error('Database connection error:', error.message, error.stack);
});

export const createUserPrompt = async (user_id, userPrompt) => {
  try {
    const result = await pool.query(
      'INSERT INTO prompt_app.prompts (user_id, prompt_text) VALUES ($1, $2) RETURNING *',
      [user_id, userPrompt]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in createUserPrompt:', error); 
    throw error; 
  }
};

export const getUserPrompts = async () => {
  try {
    const result = await pool.query('SELECT * FROM prompts');
    return result.rows;
  } catch (error) {
    console.error('Database error in getUserPrompts:', error); 
    throw error;
  }
};

export const getUserPromptById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM prompts WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Database error in getUserPromptById:', error); 
    throw error;
  }
};

export const updateUserPrompt = async (id, userPrompt, response) => {
  try {
    const result = await pool.query(
      'UPDATE prompts SET user_prompt = $1, response = $2 WHERE id = $3 RETURNING *',
      [userPrompt, response, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in updateUserPrompt:', error); 
    throw error;
  }
};

export const deleteUserPrompt = async (id) => {
  try {
    await pool.query('DELETE FROM prompts WHERE id = $1', [id]);
  } catch (error) {
    console.error('Database error in deleteUserPrompt:', error);
    throw error;
  }
};
