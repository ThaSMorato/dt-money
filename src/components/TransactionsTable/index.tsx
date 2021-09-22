import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

const numberFormatterPtBr = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
}).format;

const dateFormatter = Intl.DateTimeFormat("pt-br").format;

export const TransactionsTable: React.FC = () => {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>{numberFormatterPtBr(transaction.amount)}</td>
              <td>{transaction.category}</td>
              <td>{dateFormatter(new Date(transaction.createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
