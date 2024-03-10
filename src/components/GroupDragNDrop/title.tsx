// @flow
import styled from '@emotion/styled';
import { pink } from '@mui/material/colors';

import { grid } from './utils';

// $ExpectError - not sure why
export default styled.h4`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;

  &:focus {
    outline: 2px solid ${pink[100]};
    outline-offset: 2px;
  }
`;
