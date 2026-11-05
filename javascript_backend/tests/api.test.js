const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server');

describe('API Endpoints', function() {
  it('GET / should return API info', async function() {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');
  });

  it('GET /api/health should return health status', async function() {
    const res = await request(app).get('/api/health');
    expect(res.status).to.equal(200);
  });

  it('POST /api/anonymize should anonymize Excel file', async function() {
    // Using the test.xlsx file we created in the tests directory
    const res = await request(app)
      .post('/api/anonymize')
      .attach('file', './tests/test.xlsx')
      .field('generatePreview', 'true');
    expect(res.status).to.equal(200);
  });

  it('POST /api/anonymize masks PHI when patient ID is missing or blank', async function() {
    const XLSX = require('xlsx');
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ['Patient ID', 'Name', 'SSN', 'Condition'],
      ['PT-101', 'John Doe', '123-45-6789', 'Hypertension'],
      ['', 'Jane Smith', '987-65-4321', 'Asthma']
    ]);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const fileBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    const res = await request(app)
      .post('/api/anonymize')
      .attach('file', fileBuffer, 'test_blank_id.xlsx')
      .field('generatePreview', 'true');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('files');
    const mainBuffer = Buffer.from(res.body.files.main.data, 'base64');
    const parsedWb = XLSX.read(mainBuffer, { type: 'buffer' });
    const rows = XLSX.utils.sheet_to_json(parsedWb.Sheets['Sheet1'], { header: 1 });

    expect(rows[1][1]).to.not.equal('John Doe');
    expect(rows[1][2]).to.not.equal('123-45-6789');
    expect(rows[2][1]).to.not.equal('Jane Smith');
    expect(rows[2][2]).to.not.equal('987-65-4321');
    expect(rows[2][1]).to.match(/^WID_/);
    expect(rows[2][2]).to.match(/^WID_/);
  });
});
