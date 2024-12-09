import { Controller, Post, Body, Get,Put,Delete, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './quiz.dto';
import { Quiz } from './quiz.schema';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('generate-from-api')
  async generateQuizFromAPI(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizService.createQuizWithAPIQuestions(createQuizDto);
  }

  @Get()
  async getAllQuizzes() {
    return this.quizService.getAllQuizzes();
  }

  @Get(':id')
  async getQuizById(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  @Put(':id')
  async updateQuiz(@Param('id') id: string, @Body() updateQuizDto: Partial<CreateQuizDto>) {
    return this.quizService.updateQuiz(id, updateQuizDto);
  }

  @Delete(':id')
  async deleteQuiz(@Param('id') id: string) {
    return this.quizService.deleteQuiz(id);
  }
}
