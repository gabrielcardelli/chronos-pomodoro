import { useContext } from 'react';
import styles from './styles.module.css';
import { TaskContext, useTaskContext } from '../../contexts/TaskContext';

export function CountDown() {
  const { state } = useTaskContext();

  return (
    <div className={styles.container}>{state.formattedSecondsRemaining}</div>
  );
}
