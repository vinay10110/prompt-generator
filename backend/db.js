import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Log when the connection is established
(async () => {
  try {
    await pool.connect(); // Attempt to connect immediately
    console.log('Connected to the PostgreSQL database.');
  } catch (error) {
    console.error('Initial connection error:', error.message, error.stack);
    process.exit(1); // Exit process if connection fails
  }
})();

// Log when an error occurs
pool.on('error', (error) => {
  console.error('Database connection error:', error.message, error.stack);
});
// Define and export database functions
export const createUserPrompt = async (userPrompt, response) => {
  try {
    const result = await pool.query(
      'INSERT INTO prompts (user_prompt, response) VALUES ($1, $2) RETURNING *',
      [userPrompt, response]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in createUserPrompt:', error); // Log the database error
    throw error; // Re-throw error to be caught in the route handler
  }
};

export const getUserPrompts = async () => {
  try {
    const result = await pool.query('SELECT * FROM prompts');
    return result.rows;
  } catch (error) {
    console.error('Database error in getUserPrompts:', error); // Log the database error
    throw error;
  }
};

export const getUserPromptById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM prompts WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Database error in getUserPromptById:', error); // Log the database error
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
    console.error('Database error in updateUserPrompt:', error); // Log the database error
    throw error;
  }
};

export const deleteUserPrompt = async (id) => {
  try {
    await pool.query('DELETE FROM prompts WHERE id = $1', [id]);
  } catch (error) {
    console.error('Database error in deleteUserPrompt:', error); // Log the database error
    throw error;
  }
};
