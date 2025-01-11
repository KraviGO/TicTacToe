function goToMenu() {
    document.getElementsByClassName("startMenu")[0].style.display = "flex";
    document.getElementsByClassName("playGrid")[0].style.display = "none";
    document.getElementById("gameInfo").style.display = "none";
    document.getElementById("goToMenuBtn").style.display = "none";
    game.gridCells.forEach(cell => cell.replaceWith(cell.cloneNode(true)));
}

function goToGame() {
    document.getElementsByClassName("startMenu")[0].style.display = "none";
    document.getElementsByClassName("playGrid")[0].style.display = "grid";
    document.getElementById("gameInfo").style.display = "flex";
    document.getElementById("goToMenuBtn").style.display = "block";

}

document.getElementById('OnlineGameBtn').addEventListener("click", () => {
    goToGame();
    game = new OnlineGame();
    game.startGame();
});


document.getElementById('OfflineGameBtn').addEventListener("click", () => {
    goToGame();
    game = new OfflineGame();
    game.initializeGridListeners();
});

document.getElementById('goToMenuBtn').addEventListener("click", () => {
    goToMenu();
});