# Joke Integration Service

The following application is supposed to import jokes from the external resource.
Besides that it provides a full joke lifecycle starting from the joke initiation, ending with update and retraction.
Just like in real life :)

## Tech stack

* TypeScript
* NodeJS
* NestJS
* PostgreSQL
* Docker

## Decision record

Due to the problem simplicity and time constraints it was decided to use the Nest ORM which generates a database schema.
Please, be aware that in the case if an application scales and if that's required to optimise an SQL queries then it
would most likely require to produce SQL queries manually.

The aforementioned means that it would require a throughout monitoring and performance measurement to identify all the
potential bottlenecks of a standard NestJS ORM capabilities.

However, as mentioned before for the following problem enclosed in this task an ORM perfectly fits.

## How to run

1. The first step is to start a PostgreSQL Docker container defined within the `docker-compose`.

```shell
docker-compose up -d --build
```

2. Make requests via Swagger - `http://localhost:3000/api` or any other REST client of your choice.

An `import` endpoint is responsible for importing the joke from the external (https://icanhazdadjoke.com/api)[resource]
into the database table.

All the database schema is generated/updated from domain models (entities) upon the application startup.