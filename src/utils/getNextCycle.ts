export function getNextCycle(currenteCycle: number) {
  return currenteCycle === 0 || currenteCycle === 8 ? 1 : currenteCycle + 1;
}
