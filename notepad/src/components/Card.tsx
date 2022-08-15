import styled from "@emotion/styled";

const CardItem = styled.div`
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: 1px solid #707070;
  cursor: pointer;
`;

interface CardProps {
  title: string;
  onClick: () => void;
}

const Card = ({ title, onClick }: CardProps) => {
  return <CardItem onClick={onClick}>{title}</CardItem>;
};

export default Card;
