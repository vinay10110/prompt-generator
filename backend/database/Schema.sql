
CREATE SCHEMA IF NOT EXISTS prompt_app;


CREATE TABLE IF NOT EXISTS prompt_app.users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS prompt_app.prompts (
    prompt_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES prompt_app.users(user_id) ON DELETE CASCADE,
    prompt_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS prompt_app.responses (
    response_id SERIAL PRIMARY KEY,
    prompt_id INT NOT NULL REFERENCES prompt_app.prompts(prompt_id) ON DELETE CASCADE,
    response_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS prompt_app.interactions (
    interaction_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES prompt_app.users(user_id) ON DELETE CASCADE,
    prompt_id INT NOT NULL REFERENCES prompt_app.prompts(prompt_id) ON DELETE CASCADE,
    response_id INT NOT NULL REFERENCES prompt_app.responses(response_id) ON DELETE CASCADE,
    interaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
