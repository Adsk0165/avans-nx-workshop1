import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Quiz, QuizSchema } from './quiz.schema';
import { HttpModule } from '@nestjs/axios';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '@avans-nx-workshop/backend/user';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: process.env['JWT_SECRET'] || 'defaultsecret',
    signOptions: { expiresIn: '1h' }, // Adjust as needed
  }),
MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]), HttpModule],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService]
})
export class QuizModule {}
