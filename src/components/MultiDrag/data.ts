// @flow
import { Id, Task, Column, Entities, TaskMap } from '@/types/DragNDrop';

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

const items: Column = {
  id: 'items',
  title: 'Items',
  taskIds: tasks.map((task: Task): Id => task.id),
};

const cart: Column = {
  id: 'cart',
  title: 'Carrinho',
  taskIds: [],
};

const entities: Entities = {
  columnOrder: [items.id, cart.id],
  columns: {
    [items.id]: items,
    [cart.id]: cart,
  },
  tasks: taskMap,
};

export default entities;
