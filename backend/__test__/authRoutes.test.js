import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('Auth Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
  };

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
    });

    // it('should not register a user with invalid email', async () => {
    //   const res = await request(app)
    //     .post('/api/auth/register')
    //     .send({ ...testUser, email: 'invalid-email' });

    //   expect(res.statusCode).toBe(400);
    //   expect(res.body).toHaveProperty('errors');
    // });

    // it('should not register a user with short password', async () => {
    //   const res = await request(app)
    //     .post('/api/auth/register')
    //     .send({ ...testUser, password: '12345' });

    //   expect(res.statusCode).toBe(400);
    //   expect(res.body).toHaveProperty('errors');
    // });

    // it('should not register a user with existing email', async () => {
    //   await userModel.create(testUser);

    //   const res = await request(app)
    //     .post('/api/auth/register')
    //     .send(testUser);

    //   expect(res.statusCode).toBe(400);
    //   expect(res.body).toHaveProperty('message', 'User already exists');
    // });
  });

  // describe('POST /api/auth/login', () => {
  //   beforeEach(async () => {
  //     await userModel.create(testUser);
  //   });

  //   it('should login an existing user', async () => {
  //     jwt.sign.mockReturnValue('mocked_token');

  //     const res = await request(app)
  //       .post('/api/auth/login')
  //       .send(testUser);

  //     expect(res.statusCode).toBe(200);
  //     expect(res.body).toHaveProperty('token', 'mocked_token');
  //   });

  //   it('should not login with invalid email', async () => {
  //     const res = await request(app)
  //       .post('/api/auth/login')
  //       .send({ ...testUser, email: 'wrong@example.com' });

  //     expect(res.statusCode).toBe(401);
  //     expect(res.body).toHaveProperty('message', 'Invalid credentials');
  //   });

  //   it('should not login with wrong password', async () => {
  //     const res = await request(app)
  //       .post('/api/auth/login')
  //       .send({ ...testUser, password: 'wrongpassword' });

  //     expect(res.statusCode).toBe(401);
  //     expect(res.body).toHaveProperty('message', 'Invalid credentials');
  //   });
  // });
});