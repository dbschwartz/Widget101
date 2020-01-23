import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/addAgent', controller.create)
  .get('/allAgents', controller.all)
  .get('/:_id', controller.byId);
