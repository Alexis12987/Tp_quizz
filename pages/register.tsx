import {
  Box,
  FormControlLabel,
  Grid,
  Grow,
  Link,
  Snackbar,
  TextField,
  Button,
} from "@material-ui/core";
import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Colors } from "../src/common/Constant";
import styled from "styled-components";
import { PageLayout } from "../src/components/PageLayout";
import { Page } from "../src/types/page";
import { useAppContext } from "../src/context/AppContext";
import { Alert } from "@mui/material";

const RegisterStyled = styled.div`
  form {
    max-width: 720px;
  }
`;
interface IRegisterProps {}

const Register: Page<IRegisterProps> = (props) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({});

  const [error, setError] = useState({
    error: false,
    errorMessage: "",
  });
  const [disable, setDisable] = useState(false);

  const { register, setIsLogged, isLogged } = useAppContext();

  useEffect(() => {
    if (isLogged) {
      router.push("/game");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisable(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const email = data.get("email")!.toString();
    const password = data.get("password")!.toString();
    const response = await register(email, password);
    if (response.status != 200) {
    } else if (response.status >= 400 && response.status < 500) {
      setError({ errorMessage: response.body.message, error: true });
    } else {
      setError({ ...error, error: false });
      setIsLogged(true);
      router.push("/");
    }
    setDisable(false);
  };

  return (
    <RegisterStyled>
      <h2>{"Register"}</h2>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button variant="outlined" disabled={disable} type="submit" fullWidth>
          Sign Up
        </Button>

        {error.error && <span>Erreur Register</span>}
      </Box>

      <Snackbar
        open={error.error}
        onClick={() => {
          setError({ ...error, error: false });
        }}
        onClose={() => {
          setError({ ...error, error: false });
        }}
        autoHideDuration={5000}
        message={"Login Error"}
        TransitionComponent={Grow}
        key={Grow.name}
      >
        <Alert severity="error">{error.errorMessage}</Alert>
      </Snackbar>
    </RegisterStyled>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default Register;
