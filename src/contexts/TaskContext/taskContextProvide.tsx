import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReduce';
import { TimerWorkManager } from '../../workers/TimerworkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';
import type { TaskStateModel } from '../../models/TaskStateModel';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state')

    if(storageState == null){
      return initialTaskState
    }

    const parsedStorageState = JSON.parse(storageState) as TaskStateModel

    return{
      ...parsedStorageState,
      activeTask: null,
      secondRemaining: 0,
      formattedSecondRemaining: '00:00'
    }
  });

  const playBeepRef = useRef<() => void | null>(null);

  const worker = TimerWorkManager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }

      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {

    localStorage.setItem('state', JSON.stringify(state))

    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondRemaining} - Tsuk Pomodoro`

    worker.postMessage(state);
  }, [state, worker]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
