import axios from "axios";
import { currentPlayer } from "./currentPlayer";

axios.interceptors.request.use(function (config) {
  config.headers = { Authentication: currentPlayer().token };
  return config;
});

export default axios;
