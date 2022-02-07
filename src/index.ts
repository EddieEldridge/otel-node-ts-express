import express from 'express';

const app = express();
const PORT = 3000;
const NAME = `Eddie`;
const TITLE = `Software Developer`;

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

app.get('/exception', (req, res) => {
    throw new Error("Error handler triggered!");
});

app.listen(PORT, () => {
    console.log(`Express with Typescript and Otel! \nRunning on http://localhost:${PORT}`);
});