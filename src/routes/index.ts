import { commentRoutes } from './commentRoutes';
import { exerciseRoutes } from './exerciseRoutes';
import { userRoutes } from './userRoutes';

export const Routes = [...userRoutes, ...exerciseRoutes, ...commentRoutes];
