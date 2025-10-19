import { Container } from '../../components/Container';
import { Menu } from '../../components/Menu';
import { Logo } from '../../components/Logo';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';
import { Footer } from '../../components/Footer';
import { MainTemplate } from '../../templates/MainTemplate';
import type { TaskStateModel } from '../../models/TaskStateModel';

export function Home() {
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
