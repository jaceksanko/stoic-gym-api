import { CommentController } from '../controller/CommentController';

const routeBase = '/comment';

export const commentRoutes = [
  {
    method: 'get',
    route: routeBase,
    controller: CommentController,
    action: 'all',
  },
  {
    method: 'get',
    route: `${routeBase}/:id`,
    controller: CommentController,
    action: 'one',
  },
  {
    method: 'post',
    route: routeBase,
    controller: CommentController,
    action: 'save',
  },
  {
    method: 'delete',
    route: `${routeBase}/:id`,
    controller: CommentController,
    action: 'remove',
  },
];
