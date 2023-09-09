<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p> -->
<h1 align="center">[WIP] </br>Access Control Module For NestJs </br>CASL + NestJS</h1>

More flexible and integrated approach, than suggested by the Nest documentation:

- Permissions defined separately for each module
- In separate module permissions defined in one place with short and readable form
- Access must be controlled by:
  - Role
  - Condition (e.g. user is owner of resource)
  - Permitted fields of resourse (Different roles can have full or partial access to modify resource)
  - Combination of the above
- Сonfigurable Guard for every protected endpoint

# Installation

- Clone this repository
- Run:

```bash
$ npm i
$ docker-compose up -d
$ npm run start:dev
$ npx prisma generate
```

# How use:

[WIP]

# Requirements:

- Node
- docker
- docker-compose

# Environments

This Compose file contains environment variables, stored in `.env`
