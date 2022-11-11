import styled from "@emotion/styled";
import {
  border,
  color,
  display,
  flexbox,
  layout,
  position,
  space,
  typography,
} from "styled-system";
import { BoxProps } from "./Box";

const Button = styled.button<
  BoxProps & {
    square?: boolean;
  }
>`
  background-color: #fff;
  border: 1px solid #ccc;
  outline: none;
  height: 32px;
  font-weight: bold;
  font-size: 10px;
  width: ${({ square }) => (square ? "32px" : "72px")};
  :hover {
    border: 1px solid #000;
    background-color: #000;
    color: #fff;
    cursor: pointer;
  }
  ${layout} ${color}
    ${border} ${display} ${flexbox} ${typography} ${space} ${position};
`;

export default Button;
