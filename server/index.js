import express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import cors from 'cors';
import connect from './database/connect.js';
import postRouter from './routes/post.js';

dotenv.config({
    path: path.resolve('../.env')
});

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/v1/openai', postRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

try {
    connect(process.env.MONGODB_API);
} catch (error) {
    console.log(error);
}

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});