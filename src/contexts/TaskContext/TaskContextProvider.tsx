import { useEffect, useReducer, useState } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TaskActionTypes } from './taskActions';
import { TimeWorkerManager } from '../../workers/TimeWorkManager';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const worker = TimeWorkerManager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data as number;

    if (countDownSeconds <= 0) {
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
      console.log('Workert terminado por falta de active Taks');
    }

    worker.postMessage(state);
  }, [worker, state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
