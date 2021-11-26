import getConfig from "next/config";
import { useAppContext } from "../context/AppContext";

import { Score } from "../types/globalTypes";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
// const userSubject = new BehaviorSubject(
//   process.browser && JSON.parse(localStorage.getItem("user"))
// );

const getScores = async (token: string) => {
  const scores: Response = await fetch(
    `${process.env.BACKEND_URL}/api/scores`,
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
    error.body = ["12", "12", "15"];
    return error;
  });
  return await scores.json();
};

const setScore = async (score: Score) => {
  const scores: Response = await fetch(
    `${process.env.BACKEND_URL}/api/scores`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(score),
    }
  ).catch((error) => {
    console.error("Error:", error);
    return error;
  });
  return await scores.json();
};

export const scoresService = {
  getScores,
  setScore,
};
