import { IsMongoId, IsNotEmpty, IsString, IsOptional, IsNumber, Max, Min } from 'class-validator';

export class CreateCommentDto {
  @IsMongoId()
  quizId: string | undefined;

  @IsMongoId()
  userId: string | undefined;

  @IsString()
  @IsNotEmpty()
  comment: string | undefined;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;
}

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  comment?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;
}
