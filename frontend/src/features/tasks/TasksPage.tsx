import { tasks } from '../../mocks/tasks';
import TaskItem from './TaskItem';
import type { Task } from './TaskItem';

export default function TasksPage() {
  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map((t: Task) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </div>
  );
}
