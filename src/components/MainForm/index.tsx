import styles from './styles.module.css';

import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import type React from 'react';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || ''

  const nextCycles = getNextCycle(state.currentCycle);
  const nextCyclesType = getNextCycleType(nextCycles);

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss()

    if (taskNameInput.current === null) {
      return;
    }

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Digite o nome da tarefa');

      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      durationInMinutes: state.config[nextCyclesType],
      type: nextCyclesType,
    };


    dispatch({type: TaskActionTypes.START_TASK, payload: newTask})

    showMessage.success('Tarefa iniciada!')
  }

  function handleStopTask() {
    showMessage.dismiss()
    showMessage.error('Tarefa interrompida')
    dispatch({type: TaskActionTypes.INTERRUPT_TASK })

  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form}>
      <div className={styles.formRow}>
        <DefaultInput
          labelText='task'
          id='meuInput'
          type='text'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>

      <div className={styles.formRow}>
        <Tips/>
      </div>

      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}

      <div className={styles.formRow}>
        {!state.activeTask ? (
          <DefaultButton
            type='submit'
            icon={<PlayCircleIcon />}
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            key='btnActiveTask'
          />
        ) : (
          <DefaultButton
            type='button'
            icon={<StopCircleIcon />}
            aria-label='Parar tarefa atual'
            title='Parar tarefa atual'
            color='red'
            onClick={handleStopTask}
            key='btnStopTask'
          />
        )}
      </div>
    </form>
  );
}
