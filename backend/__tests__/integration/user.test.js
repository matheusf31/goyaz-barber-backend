import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async done => {
    await mongoose.connection.close();

    done();
  });

  it('deve ser possível se cadastrar na aplicação', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Matheus Jose',
        email: 'matheus3@gmail.com',
        password: '123456',
        phone: 994622353,
      });

    expect(response.body).toHaveProperty('id');
  });
});
