import * as React from "react";
import { ReactElement, useState, useEffect } from "react";
import styled from "styled-components";
import { PageLayout } from "../src/components/PageLayout";
import { scoresService } from "../src/services/scoresService";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useAppContext } from "../src/context/AppContext";

interface IScoresProps {}

const ScoresStyled = styled.div``;

const Scores = (props) => {
  const { jwtToken } = useAppContext();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    (async function anyNameFunction() {
      setScores(await scoresService.getScores(jwtToken));
    })();
  }, []);
  return (
    <ScoresStyled>
      <h1>Scores</h1>
      <List>
        {scores.map((score) => {
          return <ListItem>{score}</ListItem>;
        })}
      </List>
    </ScoresStyled>
  );
};

Scores.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default Scores;
