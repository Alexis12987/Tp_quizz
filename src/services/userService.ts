import getConfig from "next/config";
import Router from "next/router";
import Login from "../../pages/login";
import { LoginResponse, RegisterResponse } from "../types/globalTypes";
import { useAppContext } from "../context/AppContext";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
// const userSubject = new BehaviorSubject(
//   process.browser && JSON.parse(localStorage.getItem("user"))
// );

export const userService = {
  login,
  logout,
  register,
};

async function login(email, password) {
  const data = {
    email: email,
    password: password,
  };
  const loginApi: Response = await fetch(
    `${process.env.BACKEND_URL}/api/auth`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).catch((error) => {
    console.error("Error:", error);
    return error;
  });

  const body: LoginResponse = await loginApi.json();
  if (loginApi.status == 200) {
    localStorage.setItem("token", body.access_token);
  }

  return loginApi;
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("token");
  //   userSubject.next(null);
  Router.push("/login");
}

async function register(email, password) {
  const data = {
    email: email,
    password: password,
  };
  const register: Response = await fetch(
    `${process.env.BACKEND_URL}/api/register`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).catch((error) => {
    console.error("Error:", error);
    return error;
  });

  const body: RegisterResponse = await register.json();
  if (register.status == 200) {
    localStorage.setItem("token", body.access_token);
  }

  return register;
}
