export type PageResult<T> = {
  results: T[];
  pageCount: number;
  totalCount: number;
};

export type Question = {
  id: string;
  leetCodeNo: number;
  title: string;
  slug?: string;
  description?: string;
  topics: string;
  difficulty: string;
  createdAt?: string;
  updatedAt?: string;
  question: null;
};

export type QuestionKey = keyof Question;
