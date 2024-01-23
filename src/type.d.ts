/// <reference types="nativewind/types" />

type TPagination<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

declare namespace NodeJS {
  interface ProcessEnv {
    STORAGE_KEY: string;
  }
}
