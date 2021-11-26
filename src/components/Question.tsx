import { Button, Grid, TextField } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { QuestionType } from "../types/globalTypes";

const QuestionStyled = styled.div``;
interface IQuestionProps {
  question: QuestionType;
}

const Question: React.FunctionComponent<IQuestionProps> = ({ question }) => {
  const handleSubmit = (e: any) => {
    const response = e.target.value;
    if (response == question.correct_answer) {
    } else {
    }
  };
  const [submitedResponse, setSubmitedResponse] = useState("");
  return (
    <QuestionStyled>
      <form onSubmit={handleSubmit}>
        <Grid container direction={"column"} spacing={4}>
          <Grid item>{question.question}</Grid>
          <Grid item>
            <TextField fullWidth></TextField>
          </Grid>
          <Grid item>
            <Button
              className="submit-button"
              variant="outlined"
              type="submit"
              fullWidth
            >
              Ok
            </Button>
          </Grid>
        </Grid>
      </form>
    </QuestionStyled>
  );
};

export default Question;
