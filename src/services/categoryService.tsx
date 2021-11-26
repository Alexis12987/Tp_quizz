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

const getCategories = async (token: string) => {
  const categories: Response = await fetch(
    `${process.env.BACKEND_URL}/api/category?`,
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
    //TODO only for testing
    error.body = [
      { name: "jeux", id: 1 },
      { name: "nature", id: 2 },
    ];
    return error;
  });
  return await categories.json();
};

export const categoryService = {
  getCategories,
};
