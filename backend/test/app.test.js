import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

beforeAll(async () => {
  // connect to test DB
  await mongoose.connect(process.env.DB_URI);
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health').expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('Timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api', () => {
    it('should return API message', async () => {
      const response = await request(app).get('/api').expect(200);

      expect(response.body).toHaveProperty('message', 'Notes App is running');
    });
  });

  describe('GET /nonexistent', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/nonexistent').expect(404);

      expect(response.body).toHaveProperty('error', 'Route not found');
    });
  });

  describe('POST /api/v1/auth/sign-up', () => {
    it('should create a new user and return token', async () => {
      const res = await request(app).post('/api/v1/auth/sign-up').send({
        firstName: 'Utkarsh',
        lastName: 'Sharma',
        email: 'utkarsh@example.com',
        password: 'securePass123',
        role: 'user',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.user).toHaveProperty('email', 'utkarsh@example.com');
    });

    it('should not allow duplicate email', async () => {
      await User.create({
        firstName: 'Utkarsh',
        lastName: 'Sharma',
        email: 'utkarsh@example.com',
        password: 'hashedPass',
        role: 'user',
      });

      const res = await request(app).post('/api/v1/auth/sign-up').send({
        firstName: 'Utkarsh',
        lastName: 'Sharma',
        email: 'utkarsh@example.com',
        password: 'securePass123',
        role: 'user',
      });

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  describe('POST /api/v1/auth/sign-in', () => {
    beforeEach(async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('securePass123', salt);

      await User.create({
        firstName: 'Utkarsh',
        lastName: 'Sharma',
        email: 'utkarsh@example.com',
        password: hashedPassword,
        role: 'user',
      });
    });

    it('should sign in with correct credentials', async () => {
      const res = await request(app).post('/api/v1/auth/sign-in').send({
        email: 'utkarsh@example.com',
        password: 'securePass123',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('token');
    });

    it('should fail with wrong password', async () => {
      const res = await request(app).post('/api/v1/auth/sign-in').send({
        email: 'utkarsh@example.com',
        password: 'wrongPass',
      });

      expect(res.statusCode).toBe(401);
    });

    it('should fail if user not found', async () => {
      const res = await request(app).post('/api/v1/auth/sign-in').send({
        email: 'notfound@example.com',
        password: 'securePass123',
      });

      expect(res.statusCode).toBe(404);
    });
  });
});
