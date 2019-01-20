const express = require('express');
const path = require('path');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../index.html'));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
