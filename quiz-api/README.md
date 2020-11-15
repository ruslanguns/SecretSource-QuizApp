# Quiz API Server
## Description

This is the API REST Server for the QuizApp is built on top of [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ yarn
```

## Running the app

### Environment Variables 

This application has some requirements before starting it, firstable you need to have a database connection in MySQL, then you need to provide the OS environments for letting the server know about a MYSQL server does exist. 

You can setup your operating system with the proper variables, to have a sample of the required ENV you could see the .env.sample which is the root of this project. 

This application uses @nestjs/config package which allows to use the DotEnv Library so you could just rename the `.env.sample` to `.env` and remplace the proper values for the connection.

### Local database with Docker

Maybe you've notice there is a `docker-compose.yml` file in the root of this project, then you could just run docker-compose command to get a MySQL container for running the app, but please provide the credentials at `.env` file to allow Docker to extract the proper values of the database.

To start a docker container with MySQL just run:

```bash
$ docker-compose up
```

To stop just hit `CTRL+C`.

### Running the application

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

  Nest is [MIT licensed](LICENSE).
