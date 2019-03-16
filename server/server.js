const express = require('express');
const path = require('path');
// const auth = require('basic-auth-token');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
//
// const {getUserInfo} = require('./api/sign-in');
//
const hosts = require('./hosts');
const gtv = hosts('gtv');

const {MAP_SETTINGS} = require('./constants/map');

const port = process.env.PORT || 5000;

const app = express();

app.set('port', port);

app.use((request, response, next) => {
    console.log(`processing for data for ${request.url}`);
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.get('/sign-in', (req, res) => {
//     res.redirect('/');
// })

app.get('/', (request, response, next) => {
    console.log('redirected');
    next();
});

app.post('/api/map', async (req, res, next) => {
    // console.log(request.headers.cookie)
    const token = 'dGVzdDp0ZXN0';
    console.log(req.body)
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
    // const {email, password} = req.body;
    // const token = auth(email, password);
    //
    // const userInfo = await fetch(`${gtv}/user/info`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Basic ${token}`,
    //         'Content-Type': 'application/json',
    //     },
    // });

    // res.redirect('/');
    // userInfo.json()
    //     .then(response => {
    //         res.cookie('auth', token);
    //
    //         res.send(response);
    res.redirect('/');
    // })
    // .catch(() => res.send([]));

    // next();
});

// const handleAuthorizationSuccess = (req, res) => res.redirect('/');
//
// const handleAuthorizationError = (req, res) => res.redirect('/sign-in');
//
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//
// app.use(express.static(path.join(__dirname, '/../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

// function sayHello(request,response,next){
//   console.log('I must be called');
//   next();
// }
// app.get('/', sayHello, (request, response)=>{
//   response.send('sayHello');
// });

// app.get('/sign-in', (req, res) => {
//     res.redirect('/');
// })



// app.get('/noauth', function(req, res) {
//   console.log('Authentication Failed');
//   res.send('Authentication Failed');
// });
//
// app.get('/great', function( req, res) {
//   res.send('Supercoolstuff');
// });

app.listen(port, () => console.log(`Server is running on port ${port}`));
