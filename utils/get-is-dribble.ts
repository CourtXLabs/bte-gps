export const getIsDribble = (moveId: number | string) => {
  return moveId != 0 && moveId != 7 && moveId != 8
}
