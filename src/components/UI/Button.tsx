import * as React from "react";
import styled from "styled-components";
import { Colors } from "../../common/Constant";

interface IButtonStyledProps {
  primaryColor?: string;
  secondaryColor?: string;
  fullWidth?: boolean;
}

const ButtonStyled = styled.button<IButtonStyledProps>`
  padding: 10px;
  background-color: ${(props) => props.primaryColor};
  color: ${(props) => props.secondaryColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.secondaryColor};

  ${(props) => (props.fullWidth ? "width: 100%;" : "")};

  &:hover {
    transition: background-color 0.5s ease;
    background-color: ${(props) => props.secondaryColor};
    color: ${(props) => props.primaryColor};
  }
`;
interface IButtonProps {
  primaryColor?: string;
  secondaryColor?: string;
  hoverColor?: string;
  onClickHandler?: () => void;
  className?: string;
  style?: Object;
  type?: string;
  fullWidth?: boolean;
}

const Button: React.FunctionComponent<IButtonProps> = ({
  primaryColor = Colors.black,
  secondaryColor = Colors.white,
  children,
  onClickHandler,
  className,
  style,
  type = "button",
  fullWidth = false,
}) => {
  return (
    <ButtonStyled
      style={style}
      className={` ${className ? className : ""}`}
      onClick={onClickHandler}
      primaryColor={secondaryColor}
      secondaryColor={primaryColor}
      fullWidth={fullWidth}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
