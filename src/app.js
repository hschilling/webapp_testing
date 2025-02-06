// src/app.js
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
    ]);
});

app.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    res.status(201).json({ id: 3, name });
});

// Web Routes
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Web App</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <h1 data-testid="welcome">Welcome to our Web App</h1>
            
            <form id="userForm">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" data-testid="name-input" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" data-testid="email-input" required>
                </div>
                <button type="submit" data-testid="submit-button">Submit</button>
            </form>

            <div data-testid="success-message" style="display: none;">
                Form submitted successfully
            </div>
            <div data-testid="error-message" style="display: none;">
                Please enter a valid email
            </div>

            <script>
                document.getElementById('userForm').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const email = document.getElementById('email').value;
                    const name = document.getElementById('name').value;
                    
                    // Basic email validation
                    if (!email.includes('@')) {
                        document.querySelector('[data-testid="error-message"]').style.display = 'block';
                        document.querySelector('[data-testid="success-message"]').style.display = 'none';
                        return;
                    }

                    // Submit form
                    document.querySelector('[data-testid="success-message"]').style.display = 'block';
                    document.querySelector('[data-testid="error-message"]').style.display = 'none';
                });
            </script>
        </body>
        </html>
    `);
});

module.exports = app;