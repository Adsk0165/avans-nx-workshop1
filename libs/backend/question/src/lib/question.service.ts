import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './question.schema';
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto';
import { IQuestion } from '@avans-nx-workshop/shared/api';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);

  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>
  ) {}

  async getAllQuestions(): Promise<Question[]> {
    try {
      return await this.questionModel.find().exec();
    } catch (error) {
      console.error('Error fetching all quizzes:', error);
      throw new HttpException('Failed to fetch quizzes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getQuestionsByIds(ids: string[]): Promise<IQuestion[]> {
    const questions = await this.questionModel.find({ _id: { $in: ids } }).exec();
    return questions.map((question) => question.toObject() as IQuestion);
  }
  

  async getAllByUser(userId: string): Promise<Question[]> {
    return this.questionModel.find({ userId }).exec();
  }

  async getQuestionById(id: string): Promise<Question | null> {
    try {
      const quiz = await this.questionModel.findById(id).exec();

      if (!quiz) {
        throw new HttpException(`Quiz with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }

      return quiz;
    } catch (error) {
      console.error('Error fetching quiz by ID:', error);
      throw new HttpException('Failed to fetch quiz by ID', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(questionData: CreateQuestionDto, userId: string): Promise<Question | null> {
    const createdItem = await this.questionModel.create({
      ...questionData,
      userId,
    });
    return createdItem;
  }

async updateQuiz(id: string, updateQuizDto: Partial<CreateQuestionDto>): Promise<Question | null> {
  try {
    const updatedQuiz = await this.questionModel
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

  async deleteQuestion(id: string): Promise<{ message: string }> {
    this.logger.log(`Deleting question with id ${id}`);
    const result = await this.questionModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new HttpException(`Question with id ${id} not found`, 404);
    }
    return { message: `Question with id ${id} deleted successfully` };
  }
}
