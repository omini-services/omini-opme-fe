import { Id, Task } from '@/types/DragNDrop';

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
