import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Link from "next/link";
import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { PageLayout } from "../src/components/PageLayout";
import { useAppContext } from "../src/context/AppContext";
import ImageContainer from "../src/components/UI/ImageContainer";
import { questionService } from "../src/services/questionService";
import { categoryService } from "../src/services/categoryService";
import { Category } from "../src/types/globalTypes";
import router from "next/router";
import Question from "../src/components/Question";

const GameStyled = styled.div`
  .link {
    color: #1e88e5;
  }

  .left-section {
    display: flex;
    align-items: center;
  }
`;

const Game = (props) => {
  const { isLogged, jwtToken } = useAppContext();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState([
    {
      createdAt: "2021-11-26T12:51:52.838Z",
      incorrect_answers: ["4", "3", "6"],
      correct_answer: "5",
      type: "multiple",
      question:
        "How many games in the Crash Bandicoot series were released on the original Playstation?",
      category: "Entertainment: Video Games",
      difficulty: "easy",
      _id: "61a0f080c57df0cf7a2ee817",
      __v: 0,
    },
  ]);
  const [start, setStart] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setQuestions(
      await questionService.getQuestion(
        jwtToken,
        data.get("number-q")?.toString(),
        data.get("category")?.toString()
      )
    );
  };
  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    if (questions.length > 0) {
      setStart(true);
    }
  }, [questions]);

  useEffect(() => {
    (async function anyNameFunction() {
      setCategories(await categoryService.getCategories(jwtToken));
    })();
  }, []);

  return (
    <GameStyled>
      {!start && <h2>{"Commencer une partie"}</h2>}
      {false ? (
        <Box>
          <Grid container direction={"row"} spacing={4}>
            <Grid className="left-section" item md={6} sm={12}>
              <h1>
                Vous n'êtes pas connecté, je me connecte{" "}
                <Link href={"/login"}>
                  <a className="link">Lets goo 🔥</a>
                </Link>
              </h1>
            </Grid>
            <Grid md={6} sm={12} item>
              <ImageContainer src="/images/home_image.jpg"></ImageContainer>
            </Grid>
          </Grid>
        </Box>
      ) : start ? (
        <Question question={questions[0]}></Question>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container direction={"column"} spacing={4}>
            <Grid item>
              <InputLabel id="demo-simple-select-helper-label">
                Categorie
              </InputLabel>
              <Select
                fullWidth={true}
                labelId="category-label"
                id="category"
                name="category"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                {categories.map((cat) => {
                  return <MenuItem value={cat.id}>{cat.name}</MenuItem>;
                })}
              </Select>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type="number"
                name="number-q"
                InputProps={{
                  inputProps: {
                    max: 30,
                    min: 5,
                  },
                }}
                label="Nombre de question [5, 30]"
              />
            </Grid>

            <Grid item>
              <Button variant="outlined" type="submit" fullWidth>
                Lets goo
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </GameStyled>
  );
};

Game.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};
export default Game;
