import request from 'supertest';
import app from '../helpers/testApp';

jest.mock('../../src/emails/services/email.service', () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

describe('Authentication API', () => {
  const agent = request.agent(app);

  const user = {
    name: 'Sonu',
    email: 'sonu@test.com',
    password: 'Password123',
  };

  it('should register a new user', async () => {
    const response = await agent.post('/api/auth/register').send(user);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should not register duplicate user', async () => {
    const response = await agent.post('/api/auth/register').send(user);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should login successfully', async () => {
    const response = await agent.post('/api/auth/login').send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.user.email).toBe(user.email);

    expect(response.body.data.accessToken).toBeDefined();

    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('should fetch current logged in user', async () => {
    const response = await agent.get('/api/auth/me');

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.email).toBe(user.email);
  });

  it('should logout successfully', async () => {
    const response = await agent.post('/api/auth/logout');

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe('Logout successful');
  });

  it('should fail with invalid password', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: 'WrongPassword',
    });

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });

  it('should fail if email is missing', async () => {
    const response = await request(app).post('/api/auth/login').send({
      password: user.password,
    });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });

  it('should fail if password is missing', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: user.email,
    });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });
});
