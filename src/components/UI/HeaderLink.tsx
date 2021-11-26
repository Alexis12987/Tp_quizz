import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import { Colors } from "../../common/Constant";

const HeaderLinkStyled = styled.div`
  padding: 20px 15px;
  cursor: pointer;
  background-size: 200% 200%;
  background-image: linear-gradient(
    to top,
    ${Colors.white} 50%,
    transparent 50%
  );
  -webkit-transition: background-position 300ms, color 300ms ease,
    border-color 300ms ease;
  -moz-transition: background-position 300ms, color 300ms ease,
    border-color 300ms ease;
  -ms-transition: background-position 300ms, color 300ms ease,
    border-color 300ms ease;
  -o-transition: background-position 300ms, color 300ms ease,
    border-color 300ms ease;
  transition: background-position 300ms, color 300ms ease,
    border-color 300ms ease;

  &:hover {
    color: ${Colors.black};
    border-color: ${Colors.black};

    background-image: linear-gradient(
      to top,
      ${Colors.white} 51%,
      transparent 50%
    );
    background-position: 0 100%;
    -webkit-transition: background-position 300ms, color 300ms ease,
      border-color 300ms ease;
    -moz-transition: background-position 300ms, color 300ms ease,
      border-color 300ms ease;
    -ms-transition: background-position 300ms, color 300ms ease,
      border-color 300ms ease;
    -o-transition: background-position 300ms, color 300ms ease,
      border-color 300ms ease;
    transition: background-position 300ms, color 300ms ease,
      border-color 300ms ease;
  }
`;

interface IHeaderLinkProps {
  url: string;
  text: string;
  className?: string;
  onClick?: () => void;
}

const HeaderLink: React.FunctionComponent<IHeaderLinkProps> = ({
  url,
  text,
  className,
  onClick,
}) => {
  return (
    <HeaderLinkStyled onClick={onClick} className={className}>
      <Link href={url}>
        <a>{text}</a>
      </Link>
    </HeaderLinkStyled>
  );
};

export default HeaderLink;
