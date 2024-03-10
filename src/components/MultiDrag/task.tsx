import styled from '@emotion/styled';
import { red, pink, purple, grey } from '@mui/material/colors';
import { useCallback } from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

import { Id, Task as TaskType } from '@/types/DragNDrop';

export const grid = 8;
export const borderRadius = 2;

const primaryButton = 0;

type Props = {
  task: TaskType;
  index: number;
  isSelected: boolean;
  isGhosting: boolean;
  selectionCount: number;
  toggleSelection: (taskId: Id) => void;
  toggleSelectionInGroup: (taskId: Id) => void;
  multiSelectTo: (taskId: Id) => void;
};

const getBackgroundColor = ({
  isSelected,
  isGhosting,
}: GetBackgroundColorArgs): string => {
  if (isGhosting) {
    return red[50];
  }

  if (isSelected) {
    return pink[50];
  }

  return red[50];
};

const getColor = ({ isSelected, isGhosting }): string => {
  if (isGhosting) {
    return 'darkgrey';
  }
  if (isSelected) {
    return pink[200];
  }
  return purple[900];
};

const Container = styled.div`
  background-color: ${(props) => getBackgroundColor(props)};
  color: ${(props) => getColor(props)};
  padding: ${grid}px;
  margin-bottom: ${grid}px;
  border-radius: ${borderRadius}px;
  font-size: 18px;
  border: 3px solid ${purple[90]};
  ${(props) =>
    props.isDragging ? `box-shadow: 2px 2px 1px ${purple[900]};` : ''} ${(
    props,
  ) => (props.isGhosting ? 'opacity: 0.8;' : '')}
  
    /* needed for SelectionCount */
    position: relative;

  /* avoid default outline which looks lame with the position: absolute; */
  &:focus {
    outline: none;
    border-color: ${grey[200]};
  }
`;
/* stylelint-disable block-no-empty */
const Content = styled.div``;
/* stylelint-enable */
const size: number = 30;

const SelectionCount = styled.div`
  right: -${grid}px;
  top: -${grid}px;
  color: ${red[50]};
  background: ${purple[200]};
  border-radius: 50%;
  height: ${size}px;
  width: ${size}px;
  line-height: ${size}px;
  position: absolute;
  text-align: center;
  font-size: 0.8rem;
`;

const keyCodes = {
  enter: 13,
  escape: 27,
  arrowDown: 40,
  arrowUp: 38,
  tab: 9,
};

const Task = ({
  task,
  index,
  isSelected,
  isGhosting,
  selectionCount,
  toggleSelection,
  toggleSelectionInGroup,
  multiSelectTo,
}: Props) => {
  // Determines if the platform specific toggle selection in group key was used
  const wasToggleInSelectionGroupKeyUsed = (
    event: MouseEvent | KeyboardEvent,
  ) => {
    const isUsingWindows = navigator.platform.indexOf('Win') >= 0;
    return isUsingWindows ? event.ctrlKey : event.metaKey;
  };

  // Determines if the multiSelect key was used
  const wasMultiSelectKeyUsed = (event: MouseEvent | KeyboardEvent) =>
    event.shiftKey;

  const performAction = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      if (wasToggleInSelectionGroupKeyUsed(event)) {
        toggleSelectionInGroup(task.id);
        return;
      }

      if (wasMultiSelectKeyUsed(event)) {
        multiSelectTo(task.id);
        return;
      }

      toggleSelection(task.id);
    },
    [multiSelectTo, task.id, toggleSelection, toggleSelectionInGroup],
  );

  const onKeyDown = useCallback(
    (
      event: KeyboardEvent,
      provided: DraggableProvided,
      snapshot: DraggableStateSnapshot,
    ) => {
      if (event.defaultPrevented) {
        return;
      }

      if (snapshot.isDragging) {
        return;
      }

      if (event.keyCode !== keyCodes.enter) {
        return;
      }

      // we are using the event for selection
      event.preventDefault();

      performAction(event);
    },
    [],
  );

  const onClick = useCallback(
    (event: MouseEvent) => {
      if (event.defaultPrevented) {
        return;
      }

      if (event.button !== primaryButton) {
        return;
      }

      // marking the event as used
      event.preventDefault();

      performAction(event);
    },
    [performAction],
  );

  const onTouchEnd = useCallback(
    (event) => {
      if (event.defaultPrevented) {
        return;
      }

      // marking the event as used
      // we would also need to add some extra logic to prevent the click
      // if this element was an anchor
      event.preventDefault();
      toggleSelectionInGroup(task.id);
    },
    [task.id, toggleSelectionInGroup],
  );

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        const shouldShowSelection = snapshot.isDragging && selectionCount > 1;

        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={onClick}
            onTouchEnd={onTouchEnd}
            onKeyDown={(event) => onKeyDown(event, provided, snapshot)}
            isDragging={snapshot.isDragging}
            isSelected={isSelected}
            isGhosting={isGhosting}
          >
            <Content>{task.content}</Content>
            {shouldShowSelection ? (
              <SelectionCount>{selectionCount}</SelectionCount>
            ) : null}
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Task;
