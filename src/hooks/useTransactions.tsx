import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  category: string;
  type: string;
  createdAt: string;
  amount: number;
}

// interface TransactionInput {
//   title: string;
//   category: string;
//   type: string;
//   amount: number;
// }

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

// type TransactionInput = Pick<Transaction, 'title'| 'category'| 'type'| 'amount'>

interface TransactionProviderProps {
  children: React.ReactNode;
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export const TrasactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const createTransaction = async (transaction: TransactionInput) => {
    try {
      const {
        data: { transaction: newTransaction },
      } = await api.post<{ transaction: Transaction }>("/transactions", transaction);

      setTransactions([...transactions, newTransaction]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    api.get("/transactions").then((response) => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        createTransaction,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);

  return context;
};
