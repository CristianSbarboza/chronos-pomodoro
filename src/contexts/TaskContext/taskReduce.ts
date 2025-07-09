import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { initialTaskState } from './initialTaskState';
import { TaskActionTypes, type TaskActionModel } from './taskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycles = getNextCycle(state.currentCycle);
      const secondRemaining = newTask.durationInMinutes * 60;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycles,
        secondRemaining,
        formattedSecondRemaining: formatSecondsToMinutes(secondRemaining),
        tasks: [...state.tasks, newTask],
      };
    }

    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondRemaining: 0,
        formattedSecondRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    }

    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondRemaining: 0,
        formattedSecondRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }

    case TaskActionTypes.RESET_STATE: {
      return { ...initialTaskState };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondRemaining: action.payload.secondRemaining,
        formattedSecondRemaining: formatSecondsToMinutes(
          action.payload.secondRemaining,
        ),
      };
    }

    case TaskActionTypes.CHANGE_SETTINGS: {
      return { ...state, config: {...action.payload} };
    }
  }

  return state;
}
