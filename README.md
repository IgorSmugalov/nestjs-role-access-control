<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Description

[Nest](https://github.com/nestjs/nest) for local development with Prisma, PostgreSQL, Docker

| Branch    | Options                                                  |
| --------- | -------------------------------------------------------- |
| main      | docker-compose with: Postgres, PgAdmin                   |
| with-node | docker-compose with: Node, Postgres, PgAdmin + HotReload |

# Usage

- Clone this repository
- Run:

```bash
$ npm i
$ docker-compose up -d
$ npm run start:dev
$ npx prisma generate
```

# Requirements:

- Node
- docker
- docker-compose

# Access

## Nest App

- **API**: [http://localhost:3000](http://localhost:3000)

## Swagger

- **Doc**: [http://localhost:3000/api](http://localhost:3000/api)

## Postgres:

- `localhost:5432`
- **Username:** postgres
- **Password:** password

## PgAdmin:

- **URL:** [http://localhost:5433](http://localhost:5433)
- **Username:** admin@localhost.com
- **Password:** root

# Environments

This Compose file contains environment variables, stored in `.env`

## Postgres ENV

- `POSTGRES_DB` default value: **database**
- `POSTGRES_USER` default value: **postgres**
- `POSTGRES_PASSWORD` default value: **password**

## PgAdmin ENV

- `PGADMIN_DEFAULT_EMAIL` default value: **admin@localhost.com**
- `PGADMIN_DEFAULT_PASSWORD` default value: **root**
