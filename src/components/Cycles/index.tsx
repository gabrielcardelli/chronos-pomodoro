import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  const cycleSteps = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleSteps.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);

          return (
            <span
              key={`${nextCycleType}-${nextCycle}`}
              aria-label={`Inidicador de ciclo ${cycleDescriptionMap[nextCycleType]}`}
              title={`Inidicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
            ></span>
          );
        })}

        {/* ></span>
        <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.longBreakTime}`}></span> */}
      </div>
    </div>
  );
}
