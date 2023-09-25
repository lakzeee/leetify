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

export interface PageResult<T> {
  results: T[];
  pageCount: number;
  totalCount: number;
}

export interface Question {
  id: string;
  leetCodeNo: number;
  title: string;
  slug?: string;
  description?: string;
  topics: string;
  difficulty: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PlanQuestion {
  id?: string;
  leetCodeNo: number;
  title: string;
  topics: string;
  difficulty: string;
  groupName?: string;
  groupRank?: number;
  groupOrder?: number;
}

export interface CreatePlanReq {
  planName: string;
  tags?: string;
  description: string;
  isPublic: boolean;
  questionList?: PlanQuestion[];
}

export interface PlanQuestionRes extends CreatePlanReq {
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface User {
  name: string;
  email: string;
  authProvider: string;
  isConsent: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface UserRes {
  isNewUser: boolean;
  token: string | undefined;
  error?: string;
}

export interface ErrorRes {
  error: {
    status: number;
    message: string;
  };
}

export type DndId = string | number;

export interface DndColumn {
  id: DndId;
  title: string;
}

export interface DndItem {
  id: DndId;
  columnId: DndId;
  content: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
  columnId?: string;
}
