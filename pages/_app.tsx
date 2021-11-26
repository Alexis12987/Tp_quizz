import "../public/fonts/style.css";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode, useEffect } from "react";
import { Layout } from "../src/components/Layout";
import { AppWrapper } from "../src/context/AppContext";
import styled from "styled-components";
import { Devices } from "../src/common/Constant";
import GlobalStyle from "../globalStyle";
import { PageLayout } from "../src/components/PageLayout";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../styles/theme";
import { NextPage } from "next";
import { Page } from "../src/types/page";

// this should give a better typing
type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);
  const getLayout = Component.getLayout ?? ((page) => page);
  getLayout(<Component {...pageProps}></Component>);
  return (
    <AppWrapper>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </ThemeProvider>
    </AppWrapper>
  );
}
export default MyApp;
