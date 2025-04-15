import { Id } from './id.type';

export enum QuizDifficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
    Unknown = 'Unknown'
}


export interface IQuizIdentity {
    title: string;
    description: string;
    difficulty: QuizDifficulty;
}


export interface IQuizInfo extends IQuizIdentity {
    _id: Id;
    isActive: boolean;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    category: number;
}


export interface IQuiz extends IQuizInfo {
    questions: IQuestion[];
}


export interface IQuestion {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    explanation?: string;
    
}

export interface Quiz extends Document {
    title: string;
    description: string;
    difficulty: string;
    questions: any[];
    creatorId: string;
  }
  


export type ICreateQuiz = Pick<Quiz, 'title' | 'description' | 'difficulty' | 'creatorId' > & {
    questions: IQuestion[];
};

export type IUpdateQuiz = Partial<Omit<IQuiz, '_id' | 'creator' | 'createdAt' | 'updatedAt'>>;

export type IUpsertQuiz = IQuiz;
