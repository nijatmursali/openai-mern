import express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Configuration, OpenAIApi } from 'openai';
import PostSchema from '../models/post.js';

dotenv.config(
    {
        path: path.resolve('../.env')
    }
);

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API,
});

const openai = new OpenAIApi(configuration);

const router = express.Router();

router.route('/').post(async (req, res) => {
    try {
        const { name, email, prompt } = req.body;

        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
        });

        //const image = response.data.data[0].b64_json;
        const image = response.data.data[0].url;

        const post = new PostSchema({
            name: name,
            email: email,
            text: prompt,
            photo: image,
            createdAt: new Date()
        });
        post.save();

        res.status(200).json({
            error: false,
            image: image
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;

