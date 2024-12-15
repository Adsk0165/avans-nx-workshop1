import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { Comment } from './comment.schema';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @Get(':quizId')
  async getCommentsByQuizId(@Param('quizId') quizId: string): Promise<Comment[]> {
    return this.commentService.findAllByQuizId(quizId);
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment | null> {
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string): Promise<{ message: string }> {
    return this.commentService.deleteComment(id);
  }
}
