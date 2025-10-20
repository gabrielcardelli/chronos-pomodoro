import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { useRef, useState } from 'react';
import type { TaskModel } from '../../models/TaskModel';

export function MainForm() {
  const { setState } = useTaskContext();

  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event: React.FormEvent) {
    event.preventDefault();
    if (taskNameInput.current == null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Por favor, insira um nome para a tarefa.');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      duration: 15,
      startDate: Date.now(),
      completeDate: null,
      interuptDate: null,
      type: 'workTime',
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => ({
      ...prevState,
      config: {
        ...prevState.config,
      },
      activeTask: newTask,
      currentCycle: 1,
      secondsRemaining,
      formattedSecondsRemaining: `${String(
        Math.floor(secondsRemaining / 60),
      ).padStart(2, '0')}:${String(secondsRemaining % 60).padStart(2, '0')}`,
      tasks: [...prevState.tasks, newTask],
    }));

    console.log('Nova tarefa criada:', newTask);
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          placeholder='Digite algo'
          labelText='Task'
          id='task'
          type='text'
          //   onChange={e => setTaskName(e.target.value)}
          ref={taskNameInput}
        />
      </div>
      <div className='formRow'>
        <p>Proximo intervalo é de 25</p>
      </div>
      <div className='formRow'>
        <Cycles />
      </div>
      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
        <DefaultButton icon={<StopCircleIcon />} color='red' />
      </div>
    </form>
  );
}
