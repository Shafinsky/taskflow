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

## Короткий підсумковий репорт

У лабораторній роботі №5 було реалізовано повний цикл тестування серверної частини застосунку. Модуль UserService повністю покрито unit-тестами. Для контролерів налаштовано інтеграційні тести з підняттям необхідних залежностей та запуском HTTP-сервера. Також реалізовано E2E-тестування, яке перевіряє роботу всієї системи через реальні HTTP-запити.

Для оцінки якості тестів було проведено мутаційне тестування з використанням StrykerJS. Отриманий mutation score становить 81.82%, що перевищує мінімальний поріг та свідчить про високу ефективність тестового покриття. Результати показали, що більшість штучно внесених помилок були виявлені тестами.

## Короткий аналіз(Frontend performance)
За результатами Lighthouse Performance складає ~XX. Основні проблеми: великий Initial JS bundle, відсутність code splitting, відсутність lazy loading для компонентів. Accessibility та SEO мають високі показники. Для покращення перформансу рекомендується використовувати React.lazy, dynamic imports та оптимізацію зображень.

## Короткий аналіз Лабораторна робота №7

Аналіз фронтенду
Фронтенд-проєкт було підготовлено для аналізу продуктивності. Основні метрики продуктивності (Performance, Core Web Vitals) можуть бути отримані за допомогою інструментів Lighthouse та PageSpeed Insights після деплою фронтенду на публічний хостинг (Netlify / Vercel / Render).

Навантажувальне тестування та профілювання сервера
Для тестування використано k6, який імітує типові сценарії використання API:
отримання списку користувачів (GET /users)
створення користувачів (POST /users)
Тест виконувався з 10 одночасними віртуальними користувачами протягом 30 секунд.

Аналіз використання RAM
Під час тестування було зафіксовано використання памʼяті за допомогою process.memoryUsage().
Результат:
heapUsed та heapTotal залишалися стабільними
rss не демонстрував неконтрольованого зростання
Висновок: витоків памʼяті не виявлено, сервер коректно працює під навантаженням.

CPU профілювання
Сервер було запущено з вбудованим CPU-профайлером Node.js (--clinic).
Під час виконання навантажувального тесту було зібрано .clinic файл та проаналізовано його у Chrome DevTools.
Основні споживачі CPU:
обробка HTTP-запитів у NestJS
виконання Prisma-запитів
серіалізація JSON
Висновок: основне навантаження припадає на бізнес-логіку API та роботу з БД.

Аналіз запитів до БД
C1. Prisma Query Logging
У Prisma було увімкнено логування запитів. Під навантаженням у консолі спостерігались:
prisma:query SELECT ...
prisma:query INSERT INTO "User" ...
Це дозволило ідентифікувати найбільш часті операції читання та запису.

C2. Поведінка під навантаженням
Під час масових операцій створення користувачів було зафіксовано помилки унікальності (P2002), що є очікуваною поведінкою через обмеження @unique на поле email.
Це вказує на bottleneck у модулі створення користувачів при конкурентному записі.

Загальний висновок:
Система була успішно протестована під навантаженням.
Було зібрано метрики CPU та RAM, виконано аналіз запитів до БД та виявлено найбільш вразливий модуль — робота з користувачами та доступ до БД через Prisma.