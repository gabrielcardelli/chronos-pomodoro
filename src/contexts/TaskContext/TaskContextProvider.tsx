import { useEffect, useReducer, useRef, useState } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TaskActionTypes } from './taskActions';
import { TimeWorkerManager } from '../../workers/TimeWorkManager';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  let playBeepRef = useRef<() => void | null>(null);

  const worker = TimeWorkerManager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data as number;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        console.log('tocando audio');
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
        payload: { secondsRemaining: countDownSeconds },
      });
    }

    console.log(e.data);
  });

  useEffect(() => {
    console.log(state);
    if (!state.activeTask) {
      worker.terminate();
    }

    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      console.log('Carregando audio');
      playBeepRef.current = loadBeep();
    } else {
      console.log('Zerando o audio');
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
