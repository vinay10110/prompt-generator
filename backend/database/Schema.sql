
CREATE SCHEMA IF NOT EXISTS prompt_app;

CREATE TABLE IF NOT EXISTS prompt_app.users (
    user_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS prompt_app.prompts (
    prompt_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES prompt_app.users(user_id) ON DELETE CASCADE,
    prompt_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ts_vector tsvector GENERATED ALWAYS AS (to_tsvector('english', prompt_text)) STORED
);


CREATE TABLE IF NOT EXISTS prompt_app.responses (
    response_id BIGSERIAL PRIMARY KEY,
    prompt_id BIGINT NOT NULL REFERENCES prompt_app.prompts(prompt_id) ON DELETE CASCADE,
    response_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ts_vector tsvector GENERATED ALWAYS AS (to_tsvector('english', response_text)) STORED
);


CREATE TABLE IF NOT EXISTS prompt_app.interactions (
    interaction_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES prompt_app.users(user_id) ON DELETE CASCADE,
    prompt_id BIGINT NOT NULL REFERENCES prompt_app.prompts(prompt_id) ON DELETE CASCADE,
    response_id BIGINT NOT NULL REFERENCES prompt_app.responses(response_id) ON DELETE CASCADE,
    interaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interaction_type VARCHAR(20) CHECK (interaction_type IN ('like', 'comment', 'share'))
);


CREATE INDEX IF NOT EXISTS idx_prompts_user_id ON prompt_app.prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_responses_prompt_id ON prompt_app.responses(prompt_id);
CREATE INDEX IF NOT EXISTS idx_interactions_user_id_prompt_id ON prompt_app.interactions(user_id, prompt_id);
CREATE INDEX IF NOT EXISTS idx_prompts_text ON prompt_app.prompts USING GIN(ts_vector);
CREATE INDEX IF NOT EXISTS idx_responses_text ON prompt_app.responses USING GIN(ts_vector);







