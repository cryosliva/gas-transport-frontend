const express = require('express');

const port = process.env.PORT || 5000;

const app = express();

app.get('/api/profile', (req, res) => {
    const user = {};

    res.json(user);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
