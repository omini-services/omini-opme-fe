import React from 'react';
// import { FormattedNumber } from 'react-intl';

interface CurrencyFormatterProps {
  value: number;
  locale?: string;
  currency?: string;
}

const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
  value,
  locale = 'pt-BR',
  currency = 'BRL',
}) => {
  // return <FormattedNumber value={value} style="currency" currency={currency} />;
  return <span>test</span>;
};

export default CurrencyFormatter;
