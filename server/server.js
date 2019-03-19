const express = require('express');
const path = require('path');
const auth = require('basic-auth-token');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const multipart = require('connect-multiparty');
const multiparty = require('multiparty');

const hosts = require('./hosts');
const {MAP_SETTINGS} = require('./constants/map');

const gtv = hosts('gtv');

const port = process.env.PORT || 5000;

const app = express();

const multipartMiddleware = multipart();

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

app.get('/api/node/filter', async (req, res) => {
    const token = req.cookies && req.cookies.auth || undefined;

    const mapData = await fetch(`${gtv}/node/filter`, {
        method: 'GET',
        headers: {
            'accept': '*/*',
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
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

app.get('/api/user/info', async (req, res) => {
    const token = req.cookies && req.cookies.auth || undefined;

    const userInfo = await fetch(`${gtv}/user/info`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
    });

    userInfo.json()
        .then(response => {    
            res.send(response);
        })
        .catch(() => res.send([]));
});


app.post('/api/user/info', async (req, res) => {
    const token = req.cookies && req.cookies.auth || undefined;
    console.log(req.body)
    const {password} = req.body;

    const userInfo = await fetch(`${gtv}/user/info`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
        }),
    });

    userInfo.json()
        .then(response => {
            res.clearCookie('auth');
            res.send(response);
        })
        .catch(() => {
            res.clearCookie('auth');
            res.send({});
        });
});

app.get('/api/admin/user/list', async (req, res) => {
    const token = req.cookies && req.cookies.auth || undefined;

    const userList = await fetch(`${gtv}/admin/user/list`, {
        method: 'GET',
        headers: {
            'accept': '*/*',
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
    });

    userList.json()
        .then(response => {
            res.send(response);
        })
        .catch(() => res.send([]));
});

app.post('/api/admin/register', async (req, res) => {
    const token = req.cookies && req.cookies.auth || undefined;
    const {username, password} = req.body;

    const userList = await fetch(`${gtv}/admin/register?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
    });

    userList.json()
        .then(response => {
            res.send(response);
        })
        .catch(() => res.send([]));
});

app.post('/api/admin/user/delete', async (req, res) => {
    const token = req.cookies && req.cookies.auth || undefined;
    const {name} = req.body;

    const userList = await fetch(`${gtv}/admin/user/delete?name=${name}`, {
        method: 'PUT',
        headers: {
            'accept': '*/*',
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
    });

    userList.json()
        .then(response => {
            res.send(response);
        })
        .catch(() => res.send({}));
});

app.post('/api/admin/user/make-admin', async (req, res) => {
    const token = req.cookies && req.cookies.auth || undefined;
    const {name} = req.body;

    const userList = await fetch(`${gtv}/admin/user/make-admin?username=${name}`, {
        method: 'PUT',
        headers: {
            'accept': '*/*',
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
    });

    userList.json()
        .then(response => {
            res.send(response);
        })
        .catch(() => res.send({}));
});

app.post('/api/data/upload', multipartMiddleware, async (req, res) => {
    const token = req.cookies && req.cookies.auth || undefined;
    const {file} = req.files;
    const {year, snapshotId} = req.body;
    const {headers} = req;
    console.log(headers);
    const form = new multiparty.Form();
    console.log(form)

    const userList = await fetch(`${gtv}/data/upload`, {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'Authorization': `Basic ${token}`,
            'Content-Type': headers['content-type'],
        },
        body: {
            file, year, snapshotId,
        },
    });
    console.log(userList);

    userList.json()
        .then(response => {
            console.log(response)
            res.send(response);
        })
        .catch(error => console.log(error));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
