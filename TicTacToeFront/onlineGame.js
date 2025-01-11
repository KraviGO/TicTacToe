class OnlineGame {
    constructor(game) {
        this.url = 'http://127.0.0.1:8000';
        this.gridCells = Array.from(document.getElementsByClassName("playGridCell"));
        this.gameInfo = document.getElementById("gameInfo");
        this.game = new TicTacToe('X', 'O');
        this.interval_id = null;

        this.API = {
            post: async (endpoint, body) => {
                const response = await fetch(`${this.url}${endpoint}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json; charset=UTF-8" },
                    body: JSON.stringify(body),
                });
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.statusText}`);
                }
                return response.json();
            }
        };
    }


    startGame = async () => {
        try {
            const { player_code } = await this.API.post('/new_player');
            console.log(`Player Code: ${player_code}`);

            document.getElementById('goToMenuBtn').addEventListener("click", () => {
                this.API.post('/game/delete', {player_code: player_code});
                clearInterval(this.interval_id);
            });

            this.initializeGridListeners(player_code);

            this.updateBoardPeriodically(player_code);
        } catch (error) {
            console.error("Error starting the game:", error);
        }
    };

    initializeGridListeners = (player_code) => {
        this.gridCells.forEach(cell => {
            cell.innerText = '';
            if (!cell.classList.contains('active')) {
                cell.classList.add('active');
            }
            this.gameInfo.innerText = `Ходит ${this.game.get_player_char()}`
            cell.addEventListener("click", async (e) => {
                const row = e.target.dataset.row - 1;
                const col = e.target.dataset.col - 1;

                const body = { player_code, row, col };
                try {
                    if (cell.classList.contains('active')) {
                        if (this.game.is_valid_move(row, col)) {
                            const data = await this.API.post('/game/move', body);
                            if (data.result === "X" || data.result === "O") {
                                cell.classList.remove('active');
                                this.game.move(row, col);
                                cell.innerText = data.result;
                                cell.style.color = cell.innerText === 'X' ? 'black' : '#e67e5d';
                                this.gameInfo.innerText = `Ходит ${this.game.get_player_char()}`;

                                if (this.game.game_state !== 'in proses') {
                                    const win = this.game.game_state;
                                    this.gameInfo.innerText = win === 'draw' ? `Ничья` : `Выиграл: ${win}`
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error making a move:", error);
                }
            });
        });
    };

    updateBoardPeriodically = (player_code) => {
        const updateInterval = 500; // 3 seconds
        const updateBoard = async () => {
            try {
                const gameReq = await this.API.post('/game', { player_code });
                console.log(gameReq);

                this.gridCells.forEach(cell => {
                    const row = cell.dataset.row - 1;
                    const col = cell.dataset.col - 1;
                    if (cell.innerText !== gameReq?.board[row][col]) {
                        cell.classList.remove('active');
                        this.game.move(row, col);
                        cell.innerText = gameReq?.board[row][col];
                        cell.style.color = cell.innerText === 'X' ? 'black' : '#e67e5d';
                        this.gameInfo.innerText = `Ходит ${this.game.get_player_char()}`;
                    }
                });

                if (gameReq?.game_state !== 'in proses') {
                    const win = this.game.game_state;
                    this.gameInfo.innerText = win === 'draw' ? `Ничья` : `Выиграл: ${win}`
                    await this.API.post('/game/delete', {player_code: player_code});
                    clearInterval(this.interval_id);
                }
            } catch (error) {
                console.error("Error updating the board:", error);
            }
        };

        // Запускаем обновление доски с интервалом
        this.interval_id = setInterval(updateBoard, updateInterval);
    };
}
