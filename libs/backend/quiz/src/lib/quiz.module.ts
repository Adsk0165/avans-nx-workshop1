import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Quiz, QuizSchema } from './quiz.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]), HttpModule],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService]
})
export class QuizModule {}
