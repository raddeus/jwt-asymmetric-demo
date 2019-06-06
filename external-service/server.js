const fs = require('fs');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }

    const publicKey = fs.readFileSync('public.key.pub');

    try {
        const decoded = jwt.verify(token, publicKey);
        const { permissions, username } = decoded;
        res.json({
            username, permissions
        });
    } catch(err) {
        res.status = 403;
        res.json({
            username: null,
            permissions: [],
            error: 'Invalid Token'
        });
    }
});

app.listen(port, () => console.log(`External Service listening on port ${port}!`));