import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string | undefined;

  @IsString()
  title?: string | undefined;
}

export class DeleteQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number | undefined;

  @IsString()
  title?: string | undefined;
}

export class UpdateQuestionDto {
  @IsString()
  title?: string | undefined;
}