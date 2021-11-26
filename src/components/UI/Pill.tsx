import * as React from "react";
import styled from "styled-components";
import { Colors } from "../../common/Constant";

const PillStyled = styled.div<IPillStyledProps>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
`;

interface IPillStyledProps {
  bgColor?: string;
}
interface IPillProps {
  bgColor?: string;
  color?: string;
}

const Pill: React.FunctionComponent<IPillProps> = ({
  bgColor = Colors.black,
  color = Colors.white,
  children,
}) => {
  return (
    <PillStyled color={color} bgColor={bgColor}>
      {children}
    </PillStyled>
  );
};

export default Pill;
