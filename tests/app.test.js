// tests/app.test.js
const request = require('supertest');
const app = require('../src/app');

describe('API Tests', () => {
    it('GET /api should return welcome message', async () => {
        const response = await request(app)
            .get('/api')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.message).toBe('Welcome to the API');
    });

    it('GET /api/users should return user list', async () => {
        const response = await request(app)
            .get('/api/users')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(2);
    });

    it('POST /api/users should create new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ name: 'Alice' })
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body.name).toBe('Alice');
        expect(response.body.id).toBeDefined();
    });

    it('POST /api/users should return 400 if name is missing', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({})
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body.error).toBe('Name is required');
    });
});