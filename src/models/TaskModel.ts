import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
  id: string;
  name: string;
  duration: number; // duration in minutes
  startDate: number;
  completeDate?: number | null;
  interuptDate?: number | null;
  type: keyof TaskStateModel['config'];
};
