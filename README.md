# Joke Integration Service

The following application is supposed to import jokes from the external resource.
Besides that it provides a full joke lifecycle starting from the joke initiation, ending with update and retraction via
the REST API.

Just like in real life :)

## Tech stack

* TypeScript
* NodeJS
* NestJS
* Prisma
* Swagger
* PostgreSQL
* Docker

## How to run

### Hybrid (database in Docker + app locally)
1. The first step is to start a PostgreSQL Docker container `docker-compose up -d --build db`
2. Apply database migrations: `npx prisma migrate dev`
3. Start a server `npm run start`

### Docker Swarm cluster
1. Run the database and an application as a Docker swarm cluster `docker-compose up -d --build`

## Try it out
When an application is up and running make requests via Swagger - `http://localhost:3000/api` or any other REST client
of your choice.

An `search` endpoint is responsible for finding and importing all the jokes from the external
[resource](https://icanhazdadjoke.com/api) into the database table.

## Database migration
To generate a database migration SQL upon the prisma schema adjustment run the following
command `npx prisma migrate dev`

Detailed information on Prisma migration can be found within
the [official documentation](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#migrate-deploy)
