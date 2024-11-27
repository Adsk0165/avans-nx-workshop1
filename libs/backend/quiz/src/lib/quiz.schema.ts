import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document } from 'mongoose';

export enum QuizDifficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

@Schema()
export class Quiz {
  @IsMongoId()
    _id!: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: QuizDifficulty })
  difficulty: QuizDifficulty;

  @Prop({ required: true })
  description: string;

  constructor(name: string, difficulty: QuizDifficulty, description: string) {
    this.name = name;
    this.difficulty = difficulty;
    this.description = description;
  }
}




export type QuizDocument = Quiz & Document;

// Exporting QuizSchema as the schema for the model
export const QuizSchema = SchemaFactory.createForClass(Quiz);
