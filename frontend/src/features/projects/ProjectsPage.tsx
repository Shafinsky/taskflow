import { projects } from '../../mocks/projects';

export default function ProjectsPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Projects</h1>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
