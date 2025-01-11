class TicTacToe {
    constructor(char, other_char) {
        this.board = [['', '', ''], ['', '', ''], ['', '', '']];
        this.char = char;
        this.other_char = other_char;
        this.moves_count = 0;
        this.game_state = 'in proses';
    }

    get_player_char() {
        return this.moves_count % 2 ? 'O' : 'X';
    }

    get_state_of_game() {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i] && this.board[2][i] !== '') {
                return this.board[0][i];
            }
        }

        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2] && this.board[i][2] !== '') {
                return this.board[i][0];
            }
        }

        if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[2][2] !== '') {
            return this.board[0][0];
        }

        if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0] && this.board[2][0] !== '') {
            return this.board[2][0];
        }

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j] === '') return 'in proses';
            }
        }

        return 'draw';
    }

    is_valid_move(i, j) {
        if (this.board[i][j] !== '') return false;
        if (this.get_state_of_game() !== "in proses") return false;
        return true;
    }

    move(i, j) {
        if (!this.is_valid_move(i, j)) {
            return this.board[i][j];
        }

        this.board[i][j] = this.get_player_char();
        this.moves_count += 1

        this.game_state = this.get_state_of_game()

        return this.board[i][j]
    }
}