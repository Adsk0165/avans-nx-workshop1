import { Controller, Post, Body, Get,Put,Delete, Param, Req, UseGuards, UnauthorizedException, Request, NotFoundException } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './quiz.dto';
import { Quiz } from './quiz.schema';
import { AuthGuard } from '../../../auth/src/lib/auth/auth.guards'


@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('generate-from-api')
  @UseGuards(AuthGuard)
  async generateQuizFromAPI(
    @Body() createQuizDto: CreateQuizDto,
    @Request() req: any, 
  ): Promise<Quiz> {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.quizService.createQuizWithAPIQuestions({
      ...createQuizDto,
      creator: userId,
    });
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
@UseGuards(AuthGuard)
async updateQuiz(
  @Param('id') id: string,
  @Body() updateQuizDto: CreateQuizDto,
  @Request() req: any,
) {
  console.log('User object from request:', req.user);
  const userId = req.user?.id; 
  const userRole = req.user?.role;
  console.log(userRole)
 
  if (!userId || !userRole) {
    throw new UnauthorizedException('User not authenticated');
  }

 
  const updatedQuiz = await this.quizService.updateQuiz(id, userId, userRole, updateQuizDto);


  if (!updatedQuiz) {
    throw new NotFoundException(`Quiz with ID ${id} not found`);
  }

  return updatedQuiz;
}

  

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteQuiz(
  @Param('id') id: string,
  @Request() req: any,
) {
  const { id: userId, role } = req.user;

  if (!userId) {
    throw new UnauthorizedException('User not authenticated');
  }

  const quiz = await this.quizService.getQuizById(id);
  if (!quiz) {
    throw new NotFoundException(`Quiz with ID ${id} not found`);
  }

  if (quiz.creatorId !== userId && role !== 'admin') {
    throw new UnauthorizedException('You are not authorized to delete this quiz');
  }

  await this.quizService.deleteQuiz(id, userId, role);
  return { message: 'Quiz deleted successfully' };
}

@Post()
@UseGuards(AuthGuard)
async createCustomQuiz(@Body() dto: CreateQuizDto, @Request() req: any): Promise<Quiz> {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedException('User not authenticated');
  }

  return this.quizService.createQuiz({
    ...dto,
    creator: userId,
  });
}


}
