import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz , QuizDifficulty, QuizDocument, QuizModel } from './quiz.schema';
import { CreateQuizDto } from './quiz.dto';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs'; 

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    private readonly httpService: HttpService,
  ) {}


  async fetchQuestionsFromAPI(amount: number, category: number, difficulty: QuizDifficulty): Promise<any[]> {
    try {
      const difficultyString = difficulty.toLowerCase();
      const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficultyString}`;
      const response = await firstValueFrom(this.httpService.get<any>(url));

      if (response.data.response_code !== 0) {
        throw new HttpException('Failed to fetch questions from the API', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw new HttpException('Error fetching questions from the API', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createQuizWithAPIQuestions(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { title, description, difficulty, category, creator } = createQuizDto;
  
    try {
      const questions = await this.fetchQuestionsFromAPI(10, category!, difficulty!);
  
      const quiz = new this.quizModel({
        title,
        description,
        difficulty,
        questions,
        creatorId: creator, 
      });
  
      return await quiz.save();
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw new HttpException('Failed to create quiz', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
  async getAllQuizzes(): Promise<Quiz[]> {
    try {
      return await this.quizModel.find().exec();
    } catch (error) {
      console.error('Error fetching all quizzes:', error);
      throw new HttpException('Failed to fetch quizzes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getQuizById(id: string): Promise<Quiz | null> {
    try {
      const quiz = await this.quizModel.findById(id).exec();

      if (!quiz) {
        throw new HttpException(`Quiz with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }

      return quiz;
    } catch (error) {
      console.error('Error fetching quiz by ID:', error);
      throw new HttpException('Failed to fetch quiz by ID', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async updateQuiz(
    id: string, 
    userId: string, 
    userRole: string, 
    updateQuizDto: Partial<CreateQuizDto>
  ): Promise<Quiz | null> {
 
    const quiz = await this.quizModel.findById(id).exec();
  
    if (!quiz) {
      throw new HttpException(`Quiz with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
  
    if (quiz.creatorId !== userId && userRole !== 'admin') {
      throw new UnauthorizedException('You are not authorized to edit this quiz');
    }
  
    try {
      const updatedQuiz = await this.quizModel.findByIdAndUpdate(id, updateQuizDto, { new: true }).exec();
      return updatedQuiz;
    } catch (error) {
      console.error(`Error updating quiz with ID ${id}:`, error);
      throw new HttpException('Failed to update quiz', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  


  async deleteQuiz(id: string, userId: string, userRole: string): Promise<void> {
    try {

      const quiz = await this.quizModel.findById(id).exec();
  
      if (!quiz) {
        throw new HttpException(`Quiz with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      console.log(userRole)

      if (quiz.creatorId !== userId && userRole !== 'admin') {
        throw new UnauthorizedException('You are not authorized to delete this quiz');
      }

      await this.quizModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error(`Error deleting quiz with ID ${id} by user ${userId}:`, error);
      throw new HttpException('Failed to delete quiz', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createQuiz(dto: CreateQuizDto): Promise<Quiz> {
      const { _id, ...cleanDto } = dto as any;
  
    const quiz = new this.quizModel({
      ...cleanDto,
      questionIds: dto.questionIds ?? [],
      creatorId: dto.creator
    });
  
    return quiz.save();
  }
  
}
