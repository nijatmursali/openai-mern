import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './database/connect';
import postRouter from './routes/posts';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/v1/users', postRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

try {
    connect(process.env.MONGO_URI);
} catch (error) {
    console.log(error);
}

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});