import { Container } from '../../components/Container';
import { Menu } from '../../components/Menu';
import { Logo } from '../../components/Logo';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';
import { Footer } from '../../components/Footer';
import { MainTemplate } from '../../templates/MainTemplate';
import type { TaskStateModel } from '../../models/TaskStateModel';

type HomeProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

export function Home({ state, setState }: HomeProps) {
  console.log(state);
  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}
