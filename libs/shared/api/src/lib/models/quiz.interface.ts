// Difficulty Enum
import { Id } from './id.type';

export enum QuizDifficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
    Unknown = 'Unknown'
}

// Minimal Quiz Info
export interface IQuizIdentity {
    title: string;
    description: string;
    difficulty: QuizDifficulty;
}

// Quiz Info (Excluding Domain Entities)
export interface IQuizInfo extends IQuizIdentity {
    _id: Id;
    isActive: boolean;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    category: number;
}

// Full Quiz Interface (Including Domain Entities)
export interface IQuiz extends IQuizInfo {
    questions: IQuestion[];
}

// Associated Question Entity
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
    creatorId: string; // Link to the user's ID
  }
  

// DTOs for Quiz Operations
export type ICreateQuiz = Pick<Quiz, 'title' | 'description' | 'difficulty' | 'creatorId' > & {
    questions: IQuestion[];
};

export type IUpdateQuiz = Partial<Omit<IQuiz, '_id' | 'creator' | 'createdAt' | 'updatedAt'>>;

export type IUpsertQuiz = IQuiz;
