export interface User {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterResponse {
  access_token: string;
  username: string;
  password: string;
  email: string;
}

export interface RegisterResponseError {
  statusCode: number;
  message: string;
  error: string;
}

export interface Score {
  points: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface QuestionType {
  createdAt: Date;
  incorrect_answers: string[];
  correct_answer: string;
  type: string;
  question: string;
  category: string;
  difficulty: string;
  _id: string;
  __v: number;
}
