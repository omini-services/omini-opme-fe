import { columns } from './columns';
import { DataTable } from '@/components/Table/data-table';

import { tasks } from './data/tasks';

export const metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
};

const Tasks = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={tasks} columns={columns} />
    </div>
  );
};

export default Tasks;
