import { Container, Content } from "./styles";
import logoImg from "../../assets/logo.svg";

interface HeaderProps {
  onOpenNewTrasnsactionModal: () => void;
}

export const Header = ({ onOpenNewTrasnsactionModal }: HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt='dt money' />
        <button type='button' onClick={onOpenNewTrasnsactionModal}>
          Nova Transacao
        </button>
      </Content>
    </Container>
  );
};
