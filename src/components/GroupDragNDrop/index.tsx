import styled from '@emotion/styled';
import { red, pink } from '@mui/material/colors';
import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import type { QuoteMap } from '@/types/DragNDrop';

import QuoteList from './QuoteList';
import { reorderQuoteMap, grid } from './utils';

const Root = styled.div`
  background: ${red[200]};
  display: flex;
`;

const Column = styled.div`
  background-color: ${pink[200]};
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Group = styled.div`
  margin-top: ${grid * 2}px;
`;

const Title = styled.h4`
  margin: ${grid}px;
`;

type Props = {
  initial: QuoteMap;
};

const QuoteApp = ({ initial }: Props) => {
  const [quoteMap, setQuoteMap] = useState<QuoteMap>(initial);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newQuoteMap = reorderQuoteMap({
      quoteMap,
      source: result.source,
      destination: result.destination,
    });

    setQuoteMap(newQuoteMap);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Root>
        <Column>
          {Object.keys(quoteMap).map((key: string) => (
            <Group key={key}>
              <Title>{key}</Title>
              <QuoteList quotes={quoteMap[key]} listId={key} listType={key} />
            </Group>
          ))}
        </Column>
      </Root>
    </DragDropContext>
  );
};

export default QuoteApp;
