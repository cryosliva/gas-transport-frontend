const express = require('express');
const path = require('path');
const auth = require('basic-auth-token');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');

const hosts = require('./hosts');
const {MAP_SETTINGS} = require('./constants/map');

const gtv = hosts('gtv');

const port = process.env.PORT || 5000;

const app = express();

app.set('port', port);

app.use((request, response, next) => {
    console.log(`processing for data for ${request.url}`);
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/', (request, res, next) => {
    next();
});

app.post('/api/map', async (req, res) => {
    const token = req.cookies && req.cookies.auth || undefined;
    const body = req.body ? req.body : MAP_SETTINGS;

    const mapData = await fetch(`${gtv}/map/filter`, {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    mapData.json()
        .then(response => {
            res.send(response);
        })
        .catch(() => res.send({}));
});

app.post('/api/sign-in', async (req, res) => {
    const {email, password} = req.body;
    const token = auth(email, password);
    
    const userInfo = await fetch(`${gtv}/user/info`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
    });

    userInfo.json()
        .then(response => {
            res.cookie('auth', token);
    
            res.send(response);
        })
        .catch(() => res.send([]));
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
