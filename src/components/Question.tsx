import {
  Button,
  FormControlLabel,
  Grid,
  RadioGroup,
  TextField,
  Radio,
} from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { QuestionType } from "../types/globalTypes";

const QuestionStyled = styled.div`
  .radio {
    color: #00aaa9;
    &.Mui-checked {
      color: #00aaa9;
    }
  }
`;
interface IQuestionProps {
  question: QuestionType;
  handleNextQuestion: () => void;
  handleCorrectanswer: () => void;
}

const Question: React.FunctionComponent<IQuestionProps> = ({
  question,
  handleNextQuestion,
  handleCorrectanswer,
}) => {
  const [answers, setAnswers] = useState([]);

  const handleSubmit = (e) => {
    const data = new FormData(e.target);

    console.log(data);
    console.log(e.currentTarget);
    e.preventDefault();
    if (e.target.value == question.correct_answer) {
      handleCorrectanswer();
    }
    handleNextQuestion();
  };

  const decodeHTMLEntities = (text) => {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    if (question.type == "multiple") {
      let answers = question.incorrect_answers;
      answers.push(question.correct_answer);
      setAnswers(shuffle(answers));
    }
  }, []);

  return (
    <QuestionStyled>
      <form onSubmit={handleSubmit}>
        <Grid container direction={"column"} spacing={4}>
          <Grid item>{decodeHTMLEntities(question.question)}</Grid>
          <RadioGroup row aria-label="answer">
            {question.type === "multiple" && (
              <>
                {answers.map((answer) => {
                  return (
                    <FormControlLabel
                      key={answer}
                      value={answer}
                      control={<Radio className="radio" />}
                      label={answer}
                    />
                  );
                })}
              </>
            )}
            {question.type === "boolean" && (
              <>
                <FormControlLabel
                  value="True"
                  control={<Radio className="radio" />}
                  label="Vrai"
                />
                <FormControlLabel
                  value="False"
                  control={<Radio className="radio" />}
                  label="Faux"
                />
              </>
            )}
          </RadioGroup>
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
