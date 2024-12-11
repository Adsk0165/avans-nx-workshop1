import { IsEnum, IsNotEmpty, IsNumber, isNumber, isString, IsString } from 'class-validator';
import { Quiz, QuizDifficulty } from './quiz.schema';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string | undefined;

  @IsEnum(QuizDifficulty)
  difficulty: QuizDifficulty | undefined;

  @IsString()
  @IsNotEmpty()
  description: string | undefined;

  @IsNumber()
  category: number | undefined;

  creator: string | undefined
}

export class UpdateQuizDto {
  @IsString()
  title?: string | undefined;

  @IsEnum(QuizDifficulty)
  difficulty?: QuizDifficulty;

  @IsString()
  description?: string;

  @IsNumber()
  category: number | undefined;
}



