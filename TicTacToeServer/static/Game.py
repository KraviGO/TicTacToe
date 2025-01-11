class Game:
    def __init__(self, player1_code, player2_code, player1_char="X", player2_char="O"):
        self.board = [[''] * 3 for _ in range(3)]
        self.player1_code = player1_code
        self.player2_code = player2_code
        self.player1_char = player1_char
        self.player2_char = player2_char
        self.player_char_by_code = {player1_code : player1_char, player2_code : player2_char}
        self.moves_count = 0
        self.game_state = 'in proses'

    def get_state_of_game(self):
        for i in range(3):
            if self.board[0][i] == self.board[1][i] == self.board[2][i] != '':
                return self.board[0][i]

        for i in range(3):
            if self.board[i][0] == self.board[i][1] == self.board[i][2] != '':
                return self.board[i][0]

        if self.board[0][0] == self.board[1][1] == self.board[2][2] != '':
            return self.board[0][0]

        if self.board[0][2] == self.board[1][1] == self.board[2][0] != '':
            return self.board[0][2]

        if all(self.board[i][j] != '' for j in range(3) for i in range(3)):
            return 'draw'

        return 'in proses'

    def is_valid_move(self, player_code, i, j):
        if self.board[i][j] != '':
            return False
        if self.get_state_of_game() != "in proses":
            return False
        return (self.moves_count % 2) ^ (self.player_char_by_code[player_code] == 'X')

    def move(self, player_code, i, j):
        if not self.is_valid_move(player_code, i, j):
            return False

        self.board[i][j] = self.player_char_by_code[player_code]
        self.moves_count += 1

        self.game_state = self.get_state_of_game()

        return self.board[i][j]

if __name__ == "__main__":
    game = Game(1, 2)
    print(game.move(2, 0, 0))