import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        async (req: Request, res: Response, next: Function) => {
          try {
            const result = await new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            res.json(result);
          } catch (err) {
            next(err);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: 'Timber',
    //     lastName: 'Saw',
    //     email: 'test@test.com',
    //     password: '123',
    //     role: UserRole.ADMIN,
    //   })
    // );

    console.log(
      'Express server has started on port 3000. Open http://localhost:3000/users to see results'
    );
  })
  .catch((error) => console.log(error));
