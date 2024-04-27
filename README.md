# Joke Integration Service

The following application is supposed to import jokes from the external resource.
Besides that it provides a full joke lifecycle starting from the joke initiation, ending with update and retraction via
the REST API.

Just like in real life :)

## Tech stack

* JavaScript/TypeScript
* NodeJS
* NestJS
* Prisma
* Swagger
* PostgreSQL
* Docker

## How to run

1. The first step is to start a PostgreSQL Docker container `docker-compose up -d --build`.
2. Apply database migrations: `npx prisma migrate dev`
3. Start a server `npm run start`
4. Make requests via Swagger - `http://localhost:3000/api` or any other REST client of your choice.

An `import` endpoint is responsible for importing the joke from the external [resource](https://icanhazdadjoke.com/api)
into the database table.

Let's consider that we always would like tom import a joke with the following ID: `R7UfaahVfFd`