const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    // http calls made with supertest return promises, we can use async/await if desired
    describe('users route', () => {
        it('should return an OK status code from the users index route', async () => {
            const response = await request(server).get('/api/users');
            expect(response.status).toEqual(200);
        });

        it('should return a JSON object from the index route', async () => {
            const expectedBody = {
                "message": "Presenting all users.",
                "users": [
                    {
                        "id": 2,
                        "username": "James Halpert"
                    },
                    {
                        "id": 3,
                        "username": "Michael Scott"
                    },
                    {
                        "id": 4,
                        "username": "Pamela Beasly"
                    }
                ]
            };

            const response = await request(server).get('/api/users');

            expect(response.body).toEqual(expectedBody);
        });

        it('should return a JSON object from the index route', async () => {
            const response = await request(server).get('/api/users');

            expect(response.type).toEqual('application/json');
        });
    });
});