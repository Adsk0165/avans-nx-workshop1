export interface IQuestion {
    questionText: string; // The text of the question
    options: string[]; // Possible answers for the question
    correctAnswerIndex: number; // The index of the correct answer in the options array
    explanation?: string; // Optional explanation for the correct answer
}
