import { createIntl, createIntlCache } from 'react-intl';
import { messagesInPtBr } from './constants';

const cache = createIntlCache();

const intl = createIntl(
  {
    locale: 'pt-BR',
    messages: messagesInPtBr,
  },
  cache
);

export default intl;
