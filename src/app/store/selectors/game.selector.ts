import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { IGameState } from '../states/game.state';

const selectGame = (state: IAppState) => state.game;

export const selectCounter = createSelector(
  selectGame,
  (state: IGameState) => state.counter
);