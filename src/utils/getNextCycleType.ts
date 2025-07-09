import type { TaskModel } from '../models/TaskModel';

export function getNextCycleType(currenteCycle: number): TaskModel['type'] {
  if (currenteCycle % 8 === 0) return 'longBreakTime';
  if (currenteCycle % 2 === 0) return 'shortBreakTime';
  return 'workTime';
}
