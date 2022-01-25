export function currentPlayer() {
  return JSON.parse(localStorage.getItem("currentPlayer"));
}

export function setCurrentPlayer(player) {
  localStorage.setItem("currentPlayer", JSON.stringify(player));

  console.log(`${currentPlayer.name} logged in!`);
}

export function currentPlayerToken() {
  return currentPlayer()?.token;
}
