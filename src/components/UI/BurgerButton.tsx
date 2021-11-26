import * as React from "react";
import styled from "styled-components";
import { Colors } from "../../common/Constant";
import SvgIconBars from "../icons/IconBars";

const BurgerButtonStyled = styled.div`
  display: flex;
  cursor: pointer;
  margin: auto 0;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 6px;
  &:hover {
    background-color: ${Colors.lightDark};
  }
`;
interface IBurgerButtonProps {
  onClick?: () => void;
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const BurgerButton: React.FunctionComponent<IBurgerButtonProps> = ({
  onClick,
  className,
  height = 24,
  width = 24,
  color = Colors.white,
}) => {
  return (
    <BurgerButtonStyled onClick={onClick} className={className}>
      <SvgIconBars width={width} height={height} fill={color} />
    </BurgerButtonStyled>
  );
};

export default BurgerButton;
