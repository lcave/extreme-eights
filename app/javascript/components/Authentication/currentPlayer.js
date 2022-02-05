export function getCurrentPlayer() {
  return JSON.parse(localStorage.getItem("currentPlayer"));
}

export function setCurrentPlayer(player) {
  localStorage.setItem("currentPlayer", JSON.stringify(player));

  console.log(`${getCurrentPlayer.name} logged in!`);
}

export function currentPlayerToken() {
  return getCurrentPlayer()?.token;
}
