import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from "@material-ui/core";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Grow from "@mui/material/Grow";
import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Colors } from "../src/common/Constant";
import styled from "styled-components";
import { PageLayout } from "../src/components/PageLayout";
import { Page } from "../src/types/page";
import { useAppContext } from "../src/context/AppContext";

const LoginStyled = styled.div`
  form {
    max-width: 720px;
  }
`;
interface ILoginProps {}

const Login: Page<ILoginProps> = (props) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({});

  const [error, setError] = useState({
    error: false,
    errorMessage: "",
  });
  const [disable, setDisable] = useState(false);

  const { login, setIsLogged, isLogged } = useAppContext();

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
    const response = await login(email, password);
    if (response.status != 200) {
      setError({ ...error, error: true });
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
    <LoginStyled>
      <h2>{"Login"}</h2>
      <form onSubmit={handleSubmit}>
        <Grid container direction={"column"} spacing={4}>
          <Grid item>
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
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
            <Button
              className="submit-button"
              variant="outlined"
              disabled={disable}
              type="submit"
              fullWidth
            >
              Sign In
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>

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
      </form>
    </LoginStyled>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default Login;
