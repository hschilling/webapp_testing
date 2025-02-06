// src/app.js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
    ]);
});

app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    res.status(201).json({ id: 3, name });
});

// Export for testing
module.exports = app;