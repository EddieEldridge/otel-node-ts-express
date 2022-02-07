import { trace } from '@opentelemetry/api';
import { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import axios from 'axios';
import express from 'express';
import { getRandomNumber } from './utils/util';

const app = express();
const PORT = 3000;

const NAME = `Eddie`;
const TITLE = `Software Developer`;

const BORED_API_BASE_URL = 'https://www.boredapi.com/api'

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/test', (req, res) => {
    res.send('Hello test!');
});

app.get('/name', (req, res) => {
    res.send(`Hello ${NAME}`);
});

app.get('/job', (req, res) => {
    res.send(`Hello ${NAME}, the ${TITLE}`);
});

app.get('/salary', (req, res) => {
    const number = getRandomNumber();
    res.send(`Hello ${NAME}, the ${TITLE}. Your salary for next year is $${number}`);
});

app.get('/activity', async (req, res) => {

    try {
        const response = await axios.get(
            `${BORED_API_BASE_URL}/activity`
        )

        res.send(response.data?.activity);
    } catch (error) {
        res.send(error)
    }
});

app.get('/exception', (req, res) => {
    throw new Error("Error handler triggered!");
});

app.listen(PORT, () => {
    console.log(`Express with Typescript and Otel! \nRunning on http://localhost:${PORT}`);
});