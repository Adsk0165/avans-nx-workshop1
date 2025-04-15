import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document } from 'mongoose';
 
export enum QuestionDifficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}


@Schema({ timestamps: true }) 
export class Question {

  @Prop({ required: true })
  title: string | undefined;

  @Prop({ required: true })
  description: string | undefined;

  @Prop({ type: [String], required: true })
  options: string[] | undefined;

  @Prop({ required: true })
  correctAnswer: string | undefined;

  @Prop({ required: true, enum: QuestionDifficulty })
  difficulty: QuestionDifficulty | undefined;

  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Prop({ required: true })
  userId: string | undefined;

  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);
