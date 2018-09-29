import { getGameStateData } from "../main";

export function buildGameStateMessage() {
  const message = {
    type: 'game-state',
    data: getGameStateData()
  }
  return message
}