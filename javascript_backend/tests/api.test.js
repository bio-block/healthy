const request = require('supertest');
const expect = require('chai').expect;
const app = 'http://localhost:3001';

describe('API Endpoints', function() {
  it('GET / should return API info', async function() {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
  });

  it('GET /api/health should return health status', async function() {
    const res = await request(app).get('/api/health');
    expect(res.status).to.equal(200);
  });

  it('POST /api/anonymize should anonymize Excel file', async function() {
    // Replace 'test.xlsx' with a valid test Excel file path
    const res = await request(app)
      .post('/api/anonymize')
      .attach('file', 'test.xlsx')
      .field('generatePreview', 'true');
    expect(res.status).to.equal(200);
  });
});
