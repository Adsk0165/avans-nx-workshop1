import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document, model, Types } from 'mongoose';

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
  title: string;

  @Prop({ required: true, enum: QuizDifficulty })
  difficulty: QuizDifficulty;

  @Prop({ required: true })
  description: string;


  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Types.ObjectId[] | undefined;
  
  @Prop()
  creatorId: string | undefined
  static creatorId: any;
  
  constructor(name: string, difficulty: QuizDifficulty, description: string) {
    this.title = name;
    this.difficulty = difficulty;
    this.description = description;
  }
}

export type QuizDocument = Quiz & Document;

export const QuizSchema = SchemaFactory.createForClass(Quiz);

export const QuizModel = model<Quiz>('Quiz', QuizSchema);
