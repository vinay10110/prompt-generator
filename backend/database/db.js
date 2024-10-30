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

export const createUser = async (user_id, email,created_at) => {
 
  try {
    const result = await pool.query(
      'INSERT INTO prompt_app.users (user_id, email,created_at) VALUES ($1, $2,$3) RETURNING *',
      [user_id, email,created_at]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in createUserPrompt:', error); 
    throw error; 
  }
};
export const createUserPrompt = async (user_id,prompt_text) => {
 
  try {
    const result = await pool.query(
      'INSERT INTO prompt_app.prompts (user_id, prompt_text) VALUES ($1, $2) RETURNING *',
      [user_id,prompt_text]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in createUserPrompt:', error); 
    throw error; 
  }
};
export const userPromptResponse = async (prompt_id,response_text) => {
 
  try {
    const result = await pool.query(
      'INSERT INTO prompt_app.responses (prompt_id, response_text) VALUES ($1, $2) RETURNING *',
      [prompt_id,response_text]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in createUserPrompt:', error); 
    throw error; 
  }
};
export const userPromptInteraction = async (user_id,prompt_id,response_id) => {
 
  try {
    const result = await pool.query(
      'INSERT INTO prompt_app.interactions (user_id,prompt_id, response_id) VALUES ($1, $2,$3) RETURNING *',
      [user_id,prompt_id,response_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in createUserPrompt:', error); 
    throw error; 
  }
};

export const getUserPromptById = async (user_id) => {
  try {
    const result = await pool.query('SELECT u.user_id, u.email, p.prompt_id, p.prompt_text, r.response_id, r.response_text, r.created_at AS response_created_at FROM  prompt_app.users u JOIN  prompt_app.prompts p ON u.user_id = p.user_id LEFT JOIN  prompt_app.responses r ON p.prompt_id = r.prompt_id WHERE  u.user_id = $1 ORDER BY p.prompt_id, r.response_id;', [user_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Database error in getUserPromptById:', error); 
    throw error;
  }
};

// export const updateUserPrompt = async (id, userPrompt, response) => {
//   try {
//     const result = await pool.query(
//       'UPDATE prompts SET user_prompt = $1, response = $2 WHERE id = $3 RETURNING *',
//       [userPrompt, response, id]
//     );
//     return result.rows[0];
//   } catch (error) {
//     console.error('Database error in updateUserPrompt:', error); 
//     throw error;
//   }
// };

export const deleteUserPrompt = async (prompt_id) => {
  try {
    await pool.query('DELETE FROM prompt_app.prompts WHERE prompt_id = $1', [prompt_id]);
  } catch (error) {
    console.error('Database error in deleteUserPrompt:', error);
    throw error;
  }
};
