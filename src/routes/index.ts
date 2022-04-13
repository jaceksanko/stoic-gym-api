import { exerciseRoutes } from './exerciseRoutes';
import { userRoutes } from './userRoutes';

export const Routes = [...userRoutes, ...exerciseRoutes];
