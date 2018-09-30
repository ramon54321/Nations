import { serverState } from "../main";

export function buildGameStateMessage() {
  const message = {
    type: 'game-state',
    data: serverState.gameState
  }
  return message
}