import { IGameState, BoardCell, SIZE } from 'src/app/types';
import { Sudoku, getRandomInt } from 'src/app/sudoku';
import { numberUsageInfoHandler } from './numberUsageInfoHandler';
import { NewGamePayload } from '../../actions/game.action';

export function stateFromNewGame(
  state: IGameState,
  payload: NewGamePayload
): IGameState {
  const board: BoardCell[][] = [];
  let { difficultyLevel } = state;
  if (payload) {
    difficultyLevel = payload.value;
  }
  const valueBoard = new Sudoku().generateBoard();

  for (let i = 0; i < SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < SIZE; j++) {
      board[i][j] = {
        row: i,
        column: j,
        selected: false,
        solveValue: valueBoard[i][j],
        userValue: null,
        readonly: false,
        highlightRowColumnBox: false,
        highlightNumber: false,
        hasError: false
      };
    }
  }

  const { numberUsageInfo, countCell } = numberUsageInfoHandler();

  function setReadonlyCells() {
    const result: {
      [key: string]: boolean;
    } = {};

    while (Object.keys(result).length < difficultyLevel) {
      const rowIndex = getRandomInt(0, 8);
      const colIndex = getRandomInt(0, 8);

      const key = `row ${rowIndex}, col ${colIndex}`;

      if (!result[key]) {
        result[key] = true;
        const cell = board[rowIndex][colIndex];
        cell.userValue = cell.solveValue;
        cell.readonly = true;
        countCell(cell);
      }
    }
  }

  setReadonlyCells();

  return {
    ...state,
    difficultyLevel,
    counter: 0,
    board,
    hasSelectedCell: false,
    numberUsageInfo,
    gameTime: 0,
    boardSolved: false
  };
}
