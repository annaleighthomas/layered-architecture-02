import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import User from '../lib/models/User.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new user in the database', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ 
        name: 'Jane', 
        email: 'jane@jane.com' 
      });

    expect(res.body).toEqual({ 
      id: '1', 
      name: 'Jane', 
      email: 'jane@jane.com' 
    });
  });

  it('find a specific user in our database by id', async () => {
    const user = await User.createUser({ 
      name: 'mike', 
      email: 'mike@botti.com' 
    });

    const res = await request(app)
      .get(`/api/v1/users/${user.id}`);

    expect(res.body).toEqual(user);
  });

  it('finds all user from our database', async () => {
    const clem = await User.createUser({ 
      name: 'clem', 
      email: 'clem@clem.com' 
    });
    const culi = await User.createUser({ 
      name: 'culi', 
      email: 'culi@culi.com'
    });
    const mike = await User.createUser({
      name: 'mike',
      email: 'mike@botti.com'
    });

    const res = await request(app)
      .get('/api/v1/users');

    expect(res.body).toEqual([clem, culi, mike]);
  });

  it('updates a user in our database using an id', async () => {
    const user = await User.createUser({
      name: 'clem',
      email: 'clem@clem.com'
    });

    user.email = 'clem@hepburn.com';

    const res = await request(app)
      .put(`/api/v1/users/${user.id}`)
      .send(user);

    expect(res.body).toEqual({
      id: '1',
      name: 'clem',
      email: 'clem@hepburn.com'
    });    
  });

  it('deletes a user from out database using id', async () => {
    const user = await User.createUser({
      name: 'mike',
      email: 'mike@botti.com'
    });

    const res = await request(app)
      .delete(`/api/v1/users/${user.id}`);


    expect(res.body).toEqual({ 
      status: 'success', 
      message: 'delete success' 
    });
  });

});
