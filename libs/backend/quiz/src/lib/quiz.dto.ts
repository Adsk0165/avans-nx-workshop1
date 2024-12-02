import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { QuizDifficulty } from './quiz.schema';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string | undefined;

  @IsEnum(QuizDifficulty)
  difficulty: QuizDifficulty | undefined;

  @IsString()
  @IsNotEmpty()
  description: string | undefined;
}

export class UpdateQuizDto {
  @IsString()
  title?: string | undefined;

  @IsEnum(QuizDifficulty)
  difficulty?: QuizDifficulty;

  @IsString()
  description?: string;
}
