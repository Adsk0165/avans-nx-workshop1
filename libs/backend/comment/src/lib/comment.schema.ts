import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsString, IsNumber } from 'class-validator';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  @IsMongoId()
  quizId: string | undefined; 

  @Prop({ required: true })
  @IsMongoId()
  userId: string | undefined; 

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  comment: string | undefined;

  @Prop({ type: Number, min: 1, max: 5 })
  @IsNumber()
  rating?: number; 

  createdAt: Date | undefined; 
  updatedAt: Date | undefined;
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);
