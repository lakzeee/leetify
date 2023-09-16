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
  groupRank?: number;
  groupOrder?: number;
};

export type User = {
  name: string;
  email: string;
  authProvider: string;
  isConsent: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type UserRes = {
  isNewUser: boolean;
  user: User | undefined;
  error?: string;
};

export type UserSes = {
  email: string;
  image: string;
  name: string;
};

export type QuestionKey = keyof Question;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      API_URL: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
    }
  }
}
