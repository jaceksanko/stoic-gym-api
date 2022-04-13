import { ExerciseController } from '../controller/ExerciseController';

const routeBase = '/exercise';

export const exerciseRoutes = [
  {
    method: 'get',
    route: routeBase,
    controller: ExerciseController,
    action: 'all',
  },
  {
    method: 'get',
    route: `${routeBase}/:id`,
    controller: ExerciseController,
    action: 'one',
  },
  {
    method: 'post',
    route: routeBase,
    controller: ExerciseController,
    action: 'save',
  },
  {
    method: 'delete',
    route: `${routeBase}/:id`,
    controller: ExerciseController,
    action: 'remove',
  },
];
