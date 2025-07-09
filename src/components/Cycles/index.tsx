import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    workTime: 'Foco',
    shortBreakTime: 'Descanço curto',
    longBreakTime: 'Descnaço longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCyclesType = getNextCycleType(nextCycle);
          return (
            <span
            key={nextCycle}
              className={`${styles.cycleDot} ${styles[nextCyclesType]}`}
              aria-label={`Indicador de ciclo: ${cycleDescriptionMap[nextCyclesType]}`}
              title={`Indicador de ciclo: ${cycleDescriptionMap[nextCyclesType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
