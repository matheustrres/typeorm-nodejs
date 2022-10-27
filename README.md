# TypeORM Newest Version

Application for gain knowledge about how to handle new TypeORM connection setup by using DataSource.

Plus: The use of generic repositories is essential for working with the database.

## Technologies Used

- Node.js
- Typescript
- Overnightjs
- Docker
- TypeORM
- Postgres

## Environment Variables

Before building the project, set up the credentials required to establish a connection to Postgres.

`PG_HOST`

`PG_PORT` = 5432

`PG_USER`

`PG_PASS`

`PG_NAME`
## Build

To build the application, run the following code

```bash
docker build -t typeorm-nodejs
```

```bash
docker-compose up -d
```

## Migrations

After building the project, run the following command to handle the database migrations.

```bash
yarn mig:gen
```

```bash
yarn mig:run
```