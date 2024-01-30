export type Id = string;

export type Task = {
  id: Id;
  content: string;
};

export type Column = {
  id: Id;
  title: string;
  taskIds: Id[];
};

export type ColumnMap = {
  [columnId: Id]: Column;
};

export type TaskMap = {
  [taskId: Id]: Task;
};

export type Entities = {
  columnOrder: Id[];
  columns: ColumnMap;
  tasks: TaskMap;
};

// Group Drag And Drop TS

export type AuthorColors = {
  soft: string;
  hard: string;
};

export type Author = {
  id: Id;
  name: string;
  avatarUrl: string;
  url: string;
  colors: AuthorColors;
};

export type Quote = {
  id: Id;
  content: string;
  author: Author;
};

export type QuoteMap = {
  [key: string]: Quote[];
};
