import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Exercise } from '../entities/Exercise';
import { User } from '../entities/user/User';

export class ExerciseController {
  private exerciseRepository = AppDataSource.getRepository(Exercise);
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    const exercises = await this.exerciseRepository.find({
      relations: {
        user: true,
      },
    });
    return exercises;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.exerciseRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const exercise = new Exercise();
    exercise.title = request.body.title;
    exercise.description = request.body.description;
    const user = await this.userRepository.findOneBy({
      id: request.body.userId,
    });
    exercise.user = user;

    return this.exerciseRepository.save(exercise);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let exerciseToRemove = await this.exerciseRepository.findOneBy({
      id: request.params.id,
    });
    await this.exerciseRepository.remove(exerciseToRemove);
  }
}
