import { FormEvent, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal = ({ isOpen, onRequestClose }: NewTransactionModalProps) => {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState("deposit");

  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");

  const handleCreateNewTransaction = async (e: FormEvent) => {
    e.preventDefault();

    await createTransaction({
      title,
      amount: value,
      category,
      type,
    });

    setType("deposit");
    setTitle("");
    setValue(0);
    setCategory("");

    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'>
      <button onClick={onRequestClose} type='button' className='react-modal-close'>
        <img src={closeImg} alt='fechar modal' />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transacoes</h2>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type='text'
          placeholder='Titulo'
        />
        <input
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          type='number'
          placeholder='Preco'
        />
        <TransactionTypeContainer>
          <RadioBox
            type='button'
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor='green'>
            <img src={incomeImg} alt='Entrada' />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type='button'
            onClick={() => setType("withdraw")}
            activeColor='red'
            isActive={type === "withdraw"}>
            <img src={outcomeImg} alt='Saida' />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          type='text'
          placeholder='Categoria'
        />
        <button type='submit'>Cadastrar</button>
      </Container>
    </Modal>
  );
};
