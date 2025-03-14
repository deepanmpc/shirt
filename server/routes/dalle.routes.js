import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("Received prompt:", prompt);

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error("Error generating image:", error.response ? error.response.data : error.message);
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.code === 'billing_hard_limit_reached') {
      res.status(403).json({ message: "Billing limit reached. Please check your OpenAI account." });
    } else {
      res.status(500).json({ message: "Something went wrong", error: error.response ? error.response.data : error.message });
    }
  }
});

export default router;