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
};

export type PlanQuestion = {
  leetCodeNo: number;
  title: string;
  topics: string;
  difficulty: string;
  groupName?: string;
};

export type QuestionKey = keyof Question;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      API_URL: string;
    }
  }
}
