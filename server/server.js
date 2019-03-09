const express = require('express');
const path = require('path');
const auth = require('basic-auth-token');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, '/../dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../index.html'));
});

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

app.post('/api/sign-in', (req, res) => {
    const {email, password} = req.body;
    const token = auth(email, password);

    sleep(3000).then(() => {
        res.send(JSON.stringify([]));
    });
})

app.listen(port, () => console.log(`Server is running on port ${port}`));
