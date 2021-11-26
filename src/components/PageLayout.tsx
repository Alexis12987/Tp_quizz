import React, { Component } from "react";
import styled from "styled-components";
import { Devices } from "../common/Constant";
import Footer from "./Footer";
import Header from "./Header";

const PageLayoutStyled = styled.div<IPageLayout>`
  ${(props) =>
    props.withMargin
      ? ` margin: 2em 5em;
          @media ${Devices.max.tablet} {
          margin: 2em;
        }  
        `
      : ``}
  min-height: 100vh;
  max-width: 1540px;
`;

interface IPageLayout {
  withMargin?: boolean;
}
export class PageLayout extends Component<IPageLayout> {
  render() {
    const { children, withMargin = true } = this.props;
    return (
      <PageLayoutStyled withMargin={withMargin}>{children}</PageLayoutStyled>
    );
  }
}
