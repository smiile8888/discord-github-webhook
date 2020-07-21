const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`The server is and running at ${process.env.PORT}`);
});

app.post('/github', (req, res) => {
    console.log(req.body);
    console.log(`I got some message: ${JSON.stringify(req.body)}`);
    return res.send('Received a message!');
})

app.listen(process.env.PORT, () => console.log(`Server is running ${process.env.PORT}`));