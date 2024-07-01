export const getIsDribble = (moveId: number | string) => {
  return moveId != 0 && moveId != 8 && moveId != 9
}
