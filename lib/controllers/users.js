import { Router } from 'express';
import User from '../models/User.js';

export default Router()
  .post ('/api/v1/users', async (req, res, next) => {
    try {
      const user = await User.createUser(req.body);
      res.send(user);
    } catch (err) {
      next(err);
    }
  })

  .get('/api/v1/users/:id', async (req, res, next) => {
    try { 
      const users = await User.findById(req.params.id);
      res.send(users);
    } catch(err) {
      next(err);
    }
  })

  .get('/api/v1/users', async (req, res, next) => {
    try { 
      const users = await User.findAll();
      res.send(users);
    } catch(err) {
      next(err);
    }
  })

  .put('/api/v1/users/:id', async (req, res, next) => {
    try {
      const user = await User.updateUser(req.body, req.params.id);
      res.send(user);
    } catch(err) {
      next(err);
    }
  })

  .delete('/api/v1/users/:id', async (req, res, next) => {
    try {
      await User.deleteUser(req.params.id);
      res.send({ 
        status: 'success', 
        message: 'delete success' 
      });
    } catch(err) {
      next(err);
    }
  });
