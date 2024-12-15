import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);

  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const newComment = await this.commentModel.create(createCommentDto);
      return newComment;
    } catch (error) {
      this.logger.error('Error creating comment:', error);
      throw new HttpException('Failed to create comment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllByQuizId(quizId: string): Promise<Comment[]> {
    try {
      return await this.commentModel.find({ quizId }).exec();
    } catch (error) {
      this.logger.error('Error fetching comments for quiz:', error);
      throw new HttpException('Failed to fetch comments', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateComment(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment | null> {
    try {
      const updatedComment = await this.commentModel
        .findByIdAndUpdate(id, updateCommentDto, { new: true })
        .exec();

      if (!updatedComment) {
        throw new HttpException(`Comment with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }

      return updatedComment;
    } catch (error) {
      this.logger.error('Error updating comment:', error);
      throw new HttpException('Failed to update comment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteComment(id: string): Promise<{ message: string }> {
    const result = await this.commentModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new HttpException(`Comment with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return { message: `Comment with ID ${id} deleted successfully` };
  }
}
