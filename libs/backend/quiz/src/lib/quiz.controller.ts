import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto, UpdateQuizDto } from './quiz.dto';
import { Quiz } from './quiz.schema';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  async findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Quiz> {
    return this.quizService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.quizService.remove(id);
  }
}
