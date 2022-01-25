import axios from "axios";
import { currentPlayerToken } from "./currentPlayer";

axios.interceptors.request.use(function (config) {
  config.headers = { Authentication: currentPlayerToken() };
  return config;
});

export default axios;
