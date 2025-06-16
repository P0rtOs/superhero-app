//Опис всіх мікросервісів і їх відповідальність/поведінка

1. config/db.ts
– Відповідальність: підключення до бази даних.
– Функції:

зчитує змінні середовища (DB_HOST, DB_USER, DB_PASS, DB_NAME)

експортує інстанс клієнта pg.Pool або Prisma Client

2. models/superhero.model.ts
– Відповідальність: опис структури таблиці та SQL-запитів (якщо без ORM) або Prisma-схема.
– Функції:

інтерфейс/тип Superhero

(якщо без ORM) готові SQL запити:


const CREATE = `INSERT INTO superheroes (...) VALUES (...) RETURNING *`;
const FIND_ALL = `SELECT * FROM superheroes LIMIT $1 OFFSET $2`;


3. dtos/superhero.dto.ts
– Відповідальність: опис вхідних/вихідних даних.
– Функції:

CreateSuperheroDto (required поля)

UpdateSuperheroDto (поля опційні)

(можна валідатор на базі class-validator)

4. services/superhero.service.ts
– Відповідальність: бізнес-логіка та робота з БД.
– Функції:

create(data: CreateSuperheroDto): Promise<Superhero>

findAll(page: number, limit: number): Promise<Superhero[]>

findById(id: number): Promise<Superhero>

update(id: number, data: UpdateSuperheroDto): Promise<Superhero>

remove(id: number): Promise<void>

5. controllers/superhero.controller.ts
– Відповідальність: HTTP-шар, розбір запитів, виклик сервісів, формування відповіді.
– Функції:

createSuperhero(req, res, next) → викликає service.create

getSuperheroes(req, res, next) → service.findAll

getSuperheroById(req, res, next) → service.findById

updateSuperhero(req, res, next) → service.update

deleteSuperhero(req, res, next) → service.remove

6. routes/superhero.routes.ts
– Відповідальність: визначення маршрутів і middleware.

7. middlewares/
error.middleware.ts — ловить помилки та формує єдину JSON-відповідь з кодом і повідомленням.

notFound.middleware.ts — відповідає 404 на незнайдені маршрути.

validate.dto.ts (опційно) — перевірка вхідного тіла за DTO (наприклад, з class-validator).

8. utils/logger.ts
– Відповідальність: логування запитів і помилок (наприклад, через winston або simple console.log).

9. index.ts
– Відповідальність: точка входу й оркестрація всього.



Потік обробки запиту (наприклад, GET /api/superheroes/1)
Route (superhero.routes) ловить запит

Controller (getSuperheroById) — бере req.params.id, передає в сервіс

Service (findById) — робить запит до БД через модель

Model (superhero.model) — виконує SQL або Prisma-клієнт

Дані повертаються назад:
Service → Controller → клієнту

У разі помилки — error.middleware формує відповідь
