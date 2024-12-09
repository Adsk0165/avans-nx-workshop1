import { Id } from './id.type';

export enum QuestionDifficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface IQuestion {
  _id: Id;
  title: string;
  description: string;
  options: string[]; 
  correctAnswer: string;
  difficulty: QuestionDifficulty;
  tags?: string[]; 
  createdAt: Date;
  updatedAt: Date;
}

export type ICreateQuestion = Pick<
  IQuestion,
  'title' | 'description' | 'options' | 'correctAnswer' | 'difficulty' | 'tags'
>;
export type IUpdateQuestion = Partial<ICreateQuestion>;
