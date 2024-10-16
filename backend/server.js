import express from 'express';
import dotenv from 'dotenv';

const app=express();
dotenv.config();

app.listen(8080, () => {
    console.log(`app is listening on port 8080`)
})