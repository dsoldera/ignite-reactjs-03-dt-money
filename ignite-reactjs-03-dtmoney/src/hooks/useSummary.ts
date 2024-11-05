import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from "../contexts/TransactionsContext";
import { useMemo } from 'react';

export const useSummary = () => {
  const transactions = useContextSelector (
    TransactionsContext,
    (context) => {
      return context.transactions
    }
  );

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transactions) => {
        if (transactions.type === 'income') {
          acc.income += transactions.price;
          acc.total +=transactions.price
        } else {
          acc.outocome += transactions.price
          acc.income -= transactions.price
        }
        return acc;
      },{
        income: 0,
        outocome: 0,
        total: 0
      },
    )
  },[transactions])
  
  return summary;
}