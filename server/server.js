const express = require('express');

const app = express();

app.get('/api/users', (req, res) => {
  const users = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Steve', lastName: 'Smith'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(users);
})

const port = 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
