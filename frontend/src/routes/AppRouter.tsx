import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TasksPage from '../features/tasks/TasksPage';
import ProjectsPage from '../features/projects/ProjectsPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
