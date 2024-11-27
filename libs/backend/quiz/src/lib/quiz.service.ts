import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto, UpdateQuizDto } from './quiz.dto';
import { Quiz, QuizDocument } from './quiz.schema';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = new this.quizModel(createQuizDto);
    return quiz.save();
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(id).exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const updatedQuiz = await this.quizModel.findByIdAndUpdate(id, updateQuizDto, { new: true }).exec();
    if (!updatedQuiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    return updatedQuiz;
  }

  async remove(id: string): Promise<void> {
    const result = await this.quizModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }
  }
}
