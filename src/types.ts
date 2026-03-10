export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctAnswer: string;
  explanation?: string;
}

export interface Chapter {
  id: string;
  title: string;
  questions: Question[];
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  logo: string;
  chapters: string[];
}
