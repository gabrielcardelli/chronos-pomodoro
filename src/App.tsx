import './styles/theme.css';
import './styles/global.css';

import { Home } from './pages/Home';
import { AboutPomodoro } from './pages/AboutPomodoro';
import type { TaskStateModel } from './models/TaskStateModel';
import { useState } from 'react';
import { TaskContext, TaskContextProvider } from './contexts/TaskContext';

export function App() {
  return (
    <TaskContextProvider>
      <Home />;
    </TaskContextProvider>
  );
}
