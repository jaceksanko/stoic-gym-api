import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Comment } from '../entities/Comment';
import { Exercise } from '../entities/Exercise';

export class CommentController {
  private commentRepository = AppDataSource.getRepository(Comment);
  private exerciseRepository = AppDataSource.getRepository(Exercise);

  async all(request: Request, response: Response, next: NextFunction) {
    const comments = await this.commentRepository.find({
      relations: {
        exercise: true,
      },
    });
    return comments;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.commentRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const comment = new Comment();
    comment.description = request.body.description;
    const exercise = await this.exerciseRepository.findOneBy({
      id: request.body.exerciseId,
    });
    comment.exercise = exercise;

    return this.commentRepository.save(comment);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let commentToRemove = await this.commentRepository.findOneBy({
      id: request.params.id,
    });
    await this.commentRepository.remove(commentToRemove);
  }
}
