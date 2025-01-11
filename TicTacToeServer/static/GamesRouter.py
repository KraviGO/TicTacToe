import random
from queue import Queue
from static.Game import Game


class GamesRouter:
    def __init__(self):
        self.queue = Queue()
        self.queue_size = 0
        self.games = []

    def add_player(self):
        player_code = random.randint(1, 2**32)
        self.queue.put(player_code)
        self.queue_size += 1
        self.new_game()
        return player_code

    def new_game(self):
        if self.queue_size < 2:
            return

        player1_code = self.queue.get()
        player2_code = self.queue.get()
        self.queue_size -= 2

        self.games.append(Game(player1_code, player2_code))

    def delete_game(self, player_code):
        game = self.get_game(player_code)
        if game is None: return 'Game removed'
        self.games.remove(game)
        del game
        return 'Game removed'

    def get_game(self, player_code):
        for game in self.games:
            if game.player1_code == player_code or game.player2_code == player_code:
                return game
        return None

    def move_player(self, player_code, i, j):
        game = self.get_game(player_code)
        if not game:
            return None
        return game.move(player_code, i, j)

    def get_game_board(self, player_code):
        game = self.get_game(player_code)
        return game.board if game else None

    def get_game_state(self, player_code):
        game = self.get_game(player_code)
        return game.game_state if game else None
