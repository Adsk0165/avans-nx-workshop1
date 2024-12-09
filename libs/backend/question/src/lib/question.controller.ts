import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { IQuestion } from '@avans-nx-workshop/shared/api';
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto';
import { Question } from './question.schema';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async createQuestion(@Body() question: CreateQuestionDto): Promise<Question| null> {
    return this.questionService.create(question);
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
}
