const express = require('express');

const app = express();

app.get('/api/profile', (req, res) => {
    const user = {};

    res.json(user);
});

const port = 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
