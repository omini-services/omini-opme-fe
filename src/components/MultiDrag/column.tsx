import { colors } from '@atlaskit/theme';
import styled from '@emotion/styled';
import memoizeOne from 'memoize-one';
import { Droppable } from 'react-beautiful-dnd';

import { Id, Task as TaskType } from '@/types/DragNDrop';

import Task from './task';
import type { Column as ColumnType } from './types';

export const grid = 8;
export const borderRadius = 2;

type Props = {
  column: ColumnType;
  tasks: TaskType[];
  selectedTaskIds: Id[];
  draggingTaskId: Id;
  toggleSelection: (taskId: Id) => void;
  toggleSelectionInGroup: (taskId: Id) => void;
  multiSelectTo: (taskId: Id) => void;
};

const Container = styled.div`
  width: 300px;
  margin: ${grid}px;
  border-radius: ${borderRadius}px;
  border: 1px solid ${colors.N100};
  background-color: ${colors.N50};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-weight: bold;
  padding: ${grid}px;
`;

const TaskList = styled.div`
  padding: ${grid}px;
  min-height: 200px;
  flex-grow: 1;
  transition: background-color 0.2s ease;
  ${(props) =>
    props.isDraggingOver ? `background-color: ${colors.N200}` : ''};
`;

const getSelectedMap = memoizeOne((selectedTaskIds: Id[]) =>
  selectedTaskIds.reduce((previous: { [taskId: Id]: true }, current: Id) => {
    previous[current] = true;
    return previous;
  }, {}),
);

const Column = ({
  column,
  tasks,
  selectedTaskIds,
  draggingTaskId,
  toggleSelection,
  toggleSelectionInGroup,
  multiSelectTo,
}: Props) => {
  const selectedMap = getSelectedMap(selectedTaskIds);

  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => {
              const isSelected = !!selectedMap[task.id];
              const isGhosting =
                isSelected && draggingTaskId && draggingTaskId !== task.id;
              return (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  isSelected={isSelected}
                  isGhosting={isGhosting}
                  selectionCount={selectedTaskIds.length}
                  toggleSelection={toggleSelection}
                  toggleSelectionInGroup={toggleSelectionInGroup}
                  multiSelectTo={multiSelectTo}
                />
              );
            })}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
