"use client";

import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const httpHelper = axios.create({
  baseURL: "https://localhost:7188",
  timeout: 60000,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
    userid: Cookies.get("userid"),
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
httpHelper.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token");
    const userId = Cookies.get("userid");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (userId) {
      config.headers.userid = userId;
    }

    return config;
  },
  function (error) {
    console.log("ERROR: ", error);
    return Promise.reject(error);
  }
);

httpHelper.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Error2: ", error);
      return Promise.reject(error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default httpHelper;
