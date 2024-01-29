import styled from '@emotion/styled';
import { useState, useEffect, useCallback } from 'react';
import { DragStart, DropResult, DragDropContext } from 'react-beautiful-dnd';

import { Id, Task, Entities } from '@/types/DragNDrop';

import Column from './column';
import initial from './data';
import { mutliDragAwareReorder, multiSelectTo as multiSelect } from './utils';

const Container = styled.div`
  display: flex;
  user-select: none;
`;

const getTasks = (entities: Entities, columnId: Id): Task[] =>
  entities.columns[columnId].taskIds.map(
    (taskId: Id): Task => entities.tasks[taskId],
  );

const TaskApp = () => {
  const [entities, setEntities] = useState<Entities>(initial);
  const [selectedTaskIds, setSelectedTaskIds] = useState<Id[]>([]);
  const [draggingTaskId, setDraggingTaskId] = useState<
    string | null | undefined
  >(null);

  const unselectAll = useCallback(() => {
    setSelectedTaskIds([]);
  }, []);

  const onDragStart = useCallback(
    (start: DragStart) => {
      const id = start.draggableId;
      const selected = selectedTaskIds.find((taskId) => taskId === id);

      if (!selected) {
        unselectAll();
      }
      setDraggingTaskId(start.draggableId);
    },
    [selectedTaskIds],
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination } = result;
      const { source } = result;

      if (!destination || result.reason === 'CANCEL') {
        setDraggingTaskId(null);
        return;
      }

      const processed = mutliDragAwareReorder({
        entities,
        selectedTaskIds,
        source,
        destination,
      });

      setEntities(processed.entities);
      setSelectedTaskIds(processed.selectedTaskIds);
      setDraggingTaskId(null);
    },
    [entities, selectedTaskIds],
  );

  // Event listeners for window
  useEffect(() => {
    const onWindowKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Escape') {
        unselectAll();
      }
    };

    const onWindowClick = (event: MouseEvent) => {
      if (event.defaultPrevented) {
        return;
      }
      unselectAll();
    };

    const onWindowTouchEnd = (event: TouchEvent) => {
      if (event.defaultPrevented) {
        return;
      }
      unselectAll();
    };

    window.addEventListener('click', onWindowClick);
    window.addEventListener('keydown', onWindowKeyDown);
    window.addEventListener('touchend', onWindowTouchEnd);

    return () => {
      window.removeEventListener('click', onWindowClick);
      window.removeEventListener('keydown', onWindowKeyDown);
      window.removeEventListener('touchend', onWindowTouchEnd);
    };
  }, [unselectAll]);

  const toggleSelection = (taskId: Id) => {
    const wasSelected: boolean = selectedTaskIds.includes(taskId);

    const newTaskIds: Id[] = (() => {
      // Task was not previously selected
      // now will be the only selected item
      if (!wasSelected) {
        return [taskId];
      }

      // Task was part of a selected group
      // will now become the only selected item
      if (selectedTaskIds.length > 1) {
        return [taskId];
      }

      // task was previously selected but not in a group
      // we will now clear the selection
      return [];
    })();

    setSelectedTaskIds(newTaskIds);
  };

  const toggleSelectionInGroup = (taskId: Id) => {
    const index: number = selectedTaskIds.indexOf(taskId);

    // if not selected - add it to the selected items
    if (index === -1) {
      setSelectedTaskIds([...selectedTaskIds, taskId]);
      return;
    }

    // it was previously selected and now needs to be removed from the group
    const shallow: Id[] = [...selectedTaskIds];
    shallow.splice(index, 1);
    setSelectedTaskIds(shallow);
  };

  const multiSelectTo = (newTaskId: Id) => {
    const updated: string[] | null | undefined = multiSelect(
      entities,
      selectedTaskIds,
      newTaskId,
    );

    if (updated == null) {
      return;
    }

    setSelectedTaskIds(updated);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Container>
        {entities.columnOrder.map((columnId: Id) => (
          <Column
            column={entities.columns[columnId]}
            tasks={getTasks(entities, columnId)}
            selectedTaskIds={selectedTaskIds}
            key={columnId}
            draggingTaskId={draggingTaskId}
            toggleSelection={toggleSelection}
            toggleSelectionInGroup={toggleSelectionInGroup}
            multiSelectTo={multiSelectTo}
          />
        ))}
      </Container>
    </DragDropContext>
  );
};

export default TaskApp;
