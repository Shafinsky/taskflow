import type { Task } from '../features/tasks/TaskItem';

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Створити UI компоненти',
    description: 'Підготувати базовий інтерфейс',
    status: 'todo',
    priority: 'high',
    projectId: '101',
  },
  {
    id: '2',
    title: 'Реалізувати список задач',
    description: 'Відобразити дані з mock-файлу',
    status: 'in_progress',
    priority: 'medium',
    projectId: '101',
  },
  {
    id: '3',
    title: 'Налаштувати навігацію',
    description: 'Підключити React Router',
    status: 'done',
    priority: 'low',
    projectId: '102',
  },
];
