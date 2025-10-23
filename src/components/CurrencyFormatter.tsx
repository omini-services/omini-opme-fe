import React from 'react';

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
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);

  return <>{formatted}</>;
};

export default CurrencyFormatter;
