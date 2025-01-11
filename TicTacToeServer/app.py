from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from static.GamesRouter import GamesRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Замените "*" на конкретные домены в продакшене
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gameRouter = GamesRouter()

class MoveRequest(BaseModel):
    player_code: int
    row: int
    col: int


@app.get("/")
async def root():
    return {"message": "Hello World!"}


@app.post("/new_player")
async def new_player():
    """Добавление нового игрока в очередь."""
    player_code = gameRouter.add_player()
    return {"player_code": player_code}


@app.post("/game/move")
async def move_player(move: MoveRequest):
    """Обработка хода игрока."""
    result = gameRouter.move_player(move.player_code, move.row, move.col)
    if not result:
        raise HTTPException(status_code=400, detail="Invalid move")
    return {"result": result}


class PlayerRequest(BaseModel):
    player_code: int

@app.post("/game")
async def get_game(request: PlayerRequest):
    """Получение текущего состояния игровой доски."""
    game = gameRouter.get_game(request.player_code)
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    return game


@app.post("/game/delete")
async def delete_game(request: PlayerRequest):
    """Получение текущего состояния игровой доски."""
    result = gameRouter.delete_game(request.player_code)
    if not result:
        raise HTTPException(status_code=404, detail="Game not found")
    return {"result": result}

# Запуск сервера
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
