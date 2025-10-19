import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../../contexts/TaskContext';

export function MainForm() {
  const { setState } = useTaskContext();

  function handleClick() {
    setState(prevState => ({
      ...prevState,
      secondsRemaining: 1500,
      formattedSecondsRemaining: '25:00',
    }));
  }

  return (
    <form className='form' action=''>
      <button onClick={handleClick} type='button'>
        clicar
      </button>
      <div className='formRow'>
        <DefaultInput
          placeholder='Digite algo'
          labelText='Task'
          id='task'
          type='text'
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
