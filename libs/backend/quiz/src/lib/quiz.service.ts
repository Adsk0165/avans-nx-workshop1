import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz , QuizDifficulty, QuizDocument } from './quiz.schema';
import { CreateQuizDto } from './quiz.dto';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs'; // Import for handling observables

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    private readonly httpService: HttpService,
  ) {}

  // Fetch questions from the Open Trivia API
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
    const { title, description, difficulty, category } = createQuizDto;

    try {
      const questions = await this.fetchQuestionsFromAPI(10, category!, difficulty!);

      const quiz = new this.quizModel({
        title,
        description,
        difficulty,
        questions,
      });

      return await quiz.save();
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw new HttpException('Failed to create quiz', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get all quizzes
  async getAllQuizzes(): Promise<Quiz[]> {
    try {
      return await this.quizModel.find().exec();
    } catch (error) {
      console.error('Error fetching all quizzes:', error);
      throw new HttpException('Failed to fetch quizzes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get a quiz by ID
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

  // Update a quiz
  async updateQuiz(id: string, updateQuizDto: Partial<CreateQuizDto>): Promise<Quiz | null> {
    try {
      const updatedQuiz = await this.quizModel
        .findByIdAndUpdate(id, updateQuizDto, { new: true })
        .exec();

      if (!updatedQuiz) {
        throw new HttpException(`Quiz with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }

      return updatedQuiz;
    } catch (error) {
      console.error('Error updating quiz:', error);
      throw new HttpException('Failed to update quiz', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete a quiz
  async deleteQuiz(id: string): Promise<void> {
    try {
      const deletedQuiz = await this.quizModel.findByIdAndDelete(id).exec();

      if (!deletedQuiz) {
        throw new HttpException(`Quiz with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw new HttpException('Failed to delete quiz', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
