class OfflineGame {
    constructor() {
        this.gridCells = Array.from(document.getElementsByClassName("playGridCell"));
        this.gameInfo = document.getElementById("gameInfo");
        this.game = new TicTacToe('X', 'O');
    }

    initializeGridListeners = () => {
        console.log(this.game);
        this.gameInfo.innerText = `Ходит ${this.game.get_player_char()}`
        this.gridCells.forEach(cell => {
            cell.innerText = '';
            if (!cell.classList.contains('active')) {
                cell.classList.add('active');
            }
            cell.addEventListener("click", e => {
                const row = e.target.dataset.row - 1;
                const col = e.target.dataset.col - 1;

                if (cell.classList.contains('active')) {
                    cell.classList.remove('active');
                    cell.innerText = this.game.move(row, col);

                    cell.style.color = cell.innerText === 'X' ? 'black' : '#e67e5d';

                    this.gameInfo.innerText = `Ходит ${this.game.get_player_char()}`

                    if (this.game.game_state !== 'in proses') {
                        const win = this.game.game_state;
                        this.gameInfo.innerText = win === 'draw' ? `Ничья` : `Выиграл: ${win}`
                        // goToMenu();
                    }
                }
            });
        });
    };
}
