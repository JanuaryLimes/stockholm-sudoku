import { IGameState, DifficultyLevel } from 'src/app/types';

export const initialGameState: IGameState = {
  counter: 0,
  board: [],
  hasSelectedCell: false,
  difficultyLevel: DifficultyLevel.easy,
  selectedPosition: null,
  numberUsageInfo: {},
  gameTime: 0,
  boardSolved: false
};
