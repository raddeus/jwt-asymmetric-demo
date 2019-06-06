const fs = require('fs');
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());

app.post('/auth', (req, res) => {
    const { username } = req.body;
    // Normally, we'd verify the user's credentials and get their permissions from database.
    const privateKey = fs.readFileSync('private.key');
    const permissions = ['user.*', 'service.create', 'service.update'];
    let token = jwt.sign({ username, permissions }, privateKey, { algorithm: 'RS256'});
    res.json({ token })
});

app.listen(port, () => console.log(`Auth Service listening on port ${port}!`));