import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { Configuration, OpenAIApi } from 'openai';
import PostSchema from '../models/post';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API,
});

const openai = new OpenAIApi(configuration);

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = response.data.data[0].b64_json;

        res.status(200).json({
            image: image
        })
    } catch (error) {
        res.status(500).send(error?.response.data.error.message);
    }
});

export default router;

