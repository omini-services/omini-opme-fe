// @flow
import styled from '@emotion/styled';
import { purple, red } from '@mui/material/colors';
import { memo } from 'react';
import {
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

import type { Quote } from '@/types/DragNDrop';

import QuoteItem from './QuoteItem';
import Title from './title';
import { grid } from './utils';

export const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean,
): string => {
  if (isDraggingOver) {
    return red[50];
  }
  if (isDraggingFrom) {
    return pink[50];
  }
  return purple[50];
};

const Wrapper = styled.div`
  background-color: ${(props) =>
    getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition:
    background-color 0.2s ease,
    opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const scrollContainerHeight: number = 250;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;

  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: ${grid}px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

/* stylelint-disable block-no-empty */
const Container = styled.div``;
/* stylelint-enable */

type Props = {
  listId?: string;
  listType?: string;
  quotes: Quote[];
  title?: string;
  internalScroll?: boolean;
  scrollContainerStyle?: Object;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  style?: Object;
  // may not be provided - and might be null
  ignoreContainerClipping?: boolean;

  useClone?: boolean;
};

type QuoteListProps = {
  quotes: Quote[];
};

const InnerQuoteList = memo((props: QuoteListProps) =>
  props.quotes.map((quote: Quote, index: number) => (
    <Draggable key={quote.id} draggableId={quote.id} index={index}>
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot,
      ) => (
        <QuoteItem
          key={quote.id}
          quote={quote}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  )),
);

type InnerListProps = {
  dropProvided: DroppableProvided;
  quotes: Quote[];
  title: string;
};

function InnerList(props: InnerListProps) {
  const { quotes, dropProvided, title } = props;
  const label = title ? <Title>{title}</Title> : null;

  return (
    <Container>
      {label}
      <DropZone ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export default function QuoteList(props: Props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    quotes,
    title,
    useClone,
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) => (
              <QuoteItem
                quote={quotes[descriptor.source.index]}
                provided={provided}
                isDragging={snapshot.isDragging}
                isClone
              />
            )
          : null
      }
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle}>
              <InnerList
                quotes={quotes}
                title={title}
                dropProvided={dropProvided}
              />
            </ScrollContainer>
          ) : (
            <InnerList
              quotes={quotes}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}
