import { gameLimitOptions } from "./types"

export const AVAILABLE_PLAYER_IDS = new Set([
  55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
])
export const DEFAULT_GAMES_COUNT = "10" as gameLimitOptions
export const DEFAULT_SEASON = "all"

export const dribbleStatsmockData = {
  oneDribbleMCCombo: ["2", "3", "4", "6", "8", "-", "9"],
  oneDribbleMCInitialDirection: ["2R", "3L", "1R", "2L", "4R", "-", "3L"],
  oneDribbleMCCounterDirection: ["0", "-", "1R", "0", "2L", "-", "0"],
  oneDribbleMCLastType: ["2R", "3L", "4R", "2L", "8R", "-", "LH1"],
  oneDribbleMECombo: ["2", "3", "5", "7", "-", "-", "-"],
  twoDribbleMCCombo: ["12", "23", "34", "45", "-", "-", "-"],
  twoDribbleMCInitialDirection: ["2L", "3R", "4L", "5R", "-", "-", "-"],
  twoDribbleMCCounterDirection: ["0", "1L", "0", "2R", "-", "-", "-"],
  twoDribbleMCLastType: ["2R", "3L", "4R", "5L", "-", "-", "-"],
  twoDribbleMECombo: ["12", "23", "34", "45", "-", "-", "-"],
  threeDribbleMCCombo: ["123", "234", "345", "456", "567", "-", "789"],
  threeDribbleMCInitialDirection: ["2R", "3L", "4R", "5L", "6R", "-", "7L"],
  threeDribbleMCCounterDirection: ["0", "2L", "3R", "1L", "2R", "-", "3L"],
  threeDribbleMCLastType: ["2R", "3L", "4R", "5L", "6R", "-", "LH2"],
  threeDribbleMECombo: ["123", "234", "345", "456", "567", "-", "-"],
}
