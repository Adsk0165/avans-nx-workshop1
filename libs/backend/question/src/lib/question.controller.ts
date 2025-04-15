import { Controller, Get, Post, Put, Delete, Body, Param, Req, HttpException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { IQuestion } from '@avans-nx-workshop/shared/api';
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto';
import { Question } from './question.schema';
import { AuthGuard } from '../../../auth/src/lib/auth/auth.guards';




@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createQuestion(@Body() question: CreateQuestionDto, @Req() req: any): Promise<Question | null> {
    const userId = req.user?.id;
    return this.questionService.create(question, userId);
  }

  @Get('me')
@UseGuards(AuthGuard)
async getMyQuestions(@Req() req: any) {
  const userId = req.user?.id;
  return this.questionService.getAllByUser(userId);
}

  @Get()
  async getAllQuestions() {
    return this.questionService.getAllQuestions();
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string) {
    return this.questionService.getQuestionById(id);
  }

  @Put(':id')
  async updateQuestion(@Param('id') id: string, @Body() UpdateQuestionDto: Partial<CreateQuestionDto>) {
    return this.questionService.updateQuiz(id, UpdateQuestionDto);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    return this.questionService.deleteQuestion(id);
  }

  @Get('user/:userId')
async getQuestionsByUser(@Param('userId') userId: string) {
  return this.questionService.getAllByUser(userId);
}

@Post('by-ids')
@UseGuards(AuthGuard)
async getQuestionsByIds(@Body('ids') ids: string[]): Promise<IQuestion[]> {
  return this.questionService.getQuestionsByIds(ids);
}



}
function getMyQuestions(arg0: any, req: any, any: any) {
  throw new Error('Function not implemented.');
}

