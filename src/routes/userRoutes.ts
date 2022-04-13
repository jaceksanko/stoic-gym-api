import { UserController } from '../controller/UserController';

const routeBase = '/users';

export const userRoutes = [
  {
    method: 'get',
    route: routeBase,
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: `${routeBase}/:id`,
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: routeBase,
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: `${routeBase}/:id`,
    controller: UserController,
    action: 'remove',
  },
];
