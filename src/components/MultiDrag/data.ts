// @flow
import { Id, Task } from '@/types/DragNDrop';

import type { Column, Entities, TaskMap } from './types';

const tasks: Task[] = Array.from({ length: 20 }, (v, k) => k).map(
  (val: number): Task => ({
    id: `task-${val}`,
    content: `Task ${val}`,
  }),
);

const taskMap: TaskMap = tasks.reduce(
  (previous: TaskMap, current: Task): TaskMap => {
    previous[current.id] = current;
    return previous;
  },
  {},
);

const todo: Column = {
  id: 'items',
  title: 'Items',
  taskIds: tasks.map((task: Task): Id => task.id),
};

const done: Column = {
  id: 'cart',
  title: 'Carrinho',
  taskIds: [],
};

const entities: Entities = {
  columnOrder: [todo.id, done.id],
  columns: {
    [todo.id]: todo,
    [done.id]: done,
  },
  tasks: taskMap,
};

export default entities;
