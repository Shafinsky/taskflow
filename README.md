# TaskFlow

## Опис проєкту
TaskFlow — вебзастосунок для керування завданнями, що допомагає організувати роботу та підвищити ефективність.

## Основні можливості
- Додавання, редагування, видалення задач
- Призначення пріоритетів
- Відстеження статусу виконання
- Статистика по завершених задачах

## Технології
- Node.js + TypeScript
- NestJS / Fastify
- SQLite / PostgreSQL
- ESLint, Prettier, Husky


## Автор
Шафінський Ярослав ІС-31

## Діаграма компонентів (Software Components Diagram)

flowchart LR
    subgraph FRONTEND[Frontend (React + TypeScript)]
        UI[UI Layer<br>Pages, Components, Forms]
        ROUTER[Client Router<br>React Router]
        STATE[State Management<br>(Local/Context/Zustand)]
        API_CLIENT[API Service<br>Fetch/Axios]
        
        UI --> ROUTER
        UI --> STATE
        UI --> API_CLIENT
    end

    subgraph BACKEND[Backend (Fastify/NestJS)]
        AUTH[Auth Module<br>Login, Register, JWT]
        USERS[User Module<br>Profiles]
        PROJECTS[Project Module<br>CRUD Projects]
        TASKS[Task Module<br>CRUD Tasks]
        STATS[Statistics Module<br>Task Aggregation]

        API_GATEWAY[REST API Endpoints]

        API_GATEWAY --> AUTH
        API_GATEWAY --> USERS
        API_GATEWAY --> PROJECTS
        API_GATEWAY --> TASKS
        API_GATEWAY --> STATS
    end

    DB[(PostgreSQL Database)]

    API_CLIENT <-- HTTP/JSON --> API_GATEWAY
    AUTH --> DB
    USERS --> DB
    PROJECTS --> DB
    TASKS --> DB
    STATS --> DB

## ER-Діаграма (зв’язки даних)
    erDiagram
    USER ||--o{ PROJECT : owns
    PROJECT ||--o{ TASK : contains
    USER ||--o{ TASK : assigned

    USER {
        uuid id PK
        string email
        string password_hash
        string full_name
        timestamp created_at
    }

    PROJECT {
        uuid id PK
        string name
        text description
        uuid owner_id FK
        timestamp created_at
    }

    TASK {
        uuid id PK
        uuid project_id FK
        uuid assignee_id FK
        string title
        text description
        string status
        string priority
        timestamp created_at
        timestamp completed_at
    }

## Діаграма діяльності / Activity Diagram (основний сценарій роботи TaskFlow)

flowchart TD
    A([Початок]) --> B[Користувач авторизується]
    B --> C{Успішна авторизація?}
    C -- Ні --> B
    C -- Так --> D[Користувач відкриває список проєктів]

    D --> E[Вибір або створення нового проєкту]
    E --> F[Створення задачі]
    F --> G[Збереження задачі (Frontend → Backend → DB)]
    G --> H[Відображення задачі у списку]

    H --> I{Користувач змінює статус задачі?}
    I -- Так --> J[Оновлення статусу в БД]
    J --> H

    I -- Ні --> K{Переглянути статистику?}
    K -- Так --> L[Backend агрегує дані]
    L --> M[Frontend показує статистику]

    K -- Ні --> H
    M --> H
    H --> Z([Кінець])