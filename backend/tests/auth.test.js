const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth API', function () {
  this.timeout(10000); // Set timeout to 10 seconds for all tests

  before(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const res = await chai.request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('token');
  });

  it('should login the user', async () => {
    const res = await chai.request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    });
    expect(res).to.have.status(200, `Expected 200 but got ${res.status}`);
    expect(res.body).to.have.property('token', 'Expected login to return a token');
  });

  it('should get user details', async () => {
    const login = await chai.request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    });

    // Check if login was successful and token is present
    expect(login).to.have.status(200, `Login failed with status ${login.status}`);
    const token = login.body.token;
    expect(token).to.exist.and.be.a('string', 'Token missing from login response');

    const res = await chai.request(app)
      .get('/api/auth/user')
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('username', 'testuser');
  });
});
