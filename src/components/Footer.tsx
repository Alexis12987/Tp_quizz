import * as React from "react";
import styled from "styled-components";
import { Colors, Fonts } from "../common/Constant";

const FooterStyled = styled.footer`
  background-color: #ebfdfc;
  width: 100%;
  padding: 15px;
  color: ${Colors.white};
  font-family: ${Fonts.EpilogueRegular};
`;
interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return <FooterStyled>Bye</FooterStyled>;
};

export default Footer;
