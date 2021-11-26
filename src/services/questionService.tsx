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

const getQuestion = async (
  token: string,
  nbQuestion?: number,
  category?: string
) => {
  const queryParams = new URLSearchParams();
  if (nbQuestion) queryParams.set("question", String(nbQuestion));

  if (category) queryParams.set("cateogry", category);

  const questions: Response = await fetch(
    `${process.env.BACKEND_URL}/api/scores?` + queryParams.toString(),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).catch((error) => {
    console.error("Error:", error);

    return error;
  });
  return await questions.json();
};

export const questionService = {
  getQuestion,
};
