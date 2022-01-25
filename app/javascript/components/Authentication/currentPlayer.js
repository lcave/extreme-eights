export const currentPlayer = () =>
  JSON.parse(localStorage.getItem("currentPlayer"));

export const setCurrentPlayer = (player) => {
  localStorage.setItem("currentPlayer", JSON.stringify(player));

  console.log(`${currentPlayer.name} logged in!`);
};

export const isloggedIn = () => {
  return currentPlayer.token !== null;
};
