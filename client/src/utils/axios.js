"use client";
import axios from "axios";

console.log("url is " + process.env.NEXT_PUBLIC_SERVER_URL);

const AxiosClient = axios.create({
  baseURL: "https://skailama-server.onrender.com",
  //   headers: { "X-Custom-Header": "foobar" }
});

export default AxiosClient;
