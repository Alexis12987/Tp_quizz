import type { NextPage } from "next";

import styled from "styled-components";
import ImageContainer from "../src/components/UI/ImageContainer";
import styles from "../styles/Home.module.css";
import { PageLayout } from "../src/components/PageLayout";
import { ReactElement, useEffect } from "react";
import { Devices } from "../src/common/Constant";
import { useAppContext } from "../src/context/AppContext";
import { useRouter } from "next/router";

const HomeStyled = styled.div`
  min-height: 100vh;

  .custom-class {
    height: 500px;
  }

  .menu-container {
    display: flex;
    div {
      width: 100%;
      height: 100%;
    }
  }
`;

const SCSectionContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Home = () => {
  const { isLogged } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, []);

  return (
    <HomeStyled>
      <h1>Quizz</h1>
    </HomeStyled>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout withMargin={false}>{page}</PageLayout>;
};
async function getAuthSession(ctx) {
  return ctx.req.session.get("user");
}

export default Home;
