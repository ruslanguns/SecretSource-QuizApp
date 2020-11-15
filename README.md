# Secret Source QuizApp

A simple app so users can play answering questions.

## Checklist

### CRUD for both USERS and QUESTIONS
- ⬜ Create Roles for "Admin" & "Player".
- ⬜ An admin can, create, edit, and delete questions and players.
- ⬜ An admin can, have access to a single panel page to manage questions.
- ⬜ A player can, see and answers questions, but can't access to the admin's panel.
- ⬜ A player can register and sign in.
- ⬜ Questions must have the question and at least one correct answer.
- ⬜ Should have status published/unpublished.
  
### Views

- ⬜ Register and login functionality - Only players can be registered.
- ⬜ Landing page with the "published" questions.
- ⬜ Admin panel to manage questions and players.

## Proposed technologies

- **NestJS for the API**: A progressive Node.js framework for building efficient, reliable and scalable server-side applications..
- **TypeORM**: TypeORM is an ORM that can run in NodeJS and can be used with TypeScript and JavaScript.
- **Angular 10+**: Angular is an application design framework and development platform for creating efficient and sophisticated single-page app.

![tech slide](_notes/assets/images/SecretSourceQuizAppTechnologies.jpg)

> For more information I will try to wrap more details in this [document](_notes/technologies.md)

## Application goal and sketches

We are going to build a web application which implements a basic Quiz App flow which allows you to learn german by answering questions. As a player you will be able to answer the quiz in just one opportunity, you will be promped when new question arise and it will store your score and history.

I have curated some sketches for the application I want to do. Please checkout the images and additional information [in this document](_notes/sketch.md)

![APPLICATION MAP](_notes/assets/images/SecretSourceQuizAppApplicationMap.jpg)

There are some sketch that have been made for the purpose of this project read more about in this [document](_notes/sketch.md)

## Tasks and estimations

|No.   |Environment   |Detail   |Time   |Status   |
|---|---|---|---|---|
|1   |server   |Generate the project scafolding with NestJS CLI   |5 min   |**COMPLETED**   |
|2   |server   |Create the folder architecture and basic configuration   |15 min   |**COMPLETED**   |
|3   |server   |Add Database MySQL configuration   |10 min   |**COMPLETED**   |
|4   |server   |Add authentication with JWT local and strategy  |2 hour   |**COMPLETED**   |
|5   |server   |Add CRUD for Questions  |1 hour   |INCOMPLETE   |
|6   |server   |Add Quiz Service / Controller  |1 hour   |INCOMPLETE   |
|7   |client   |Generate the project scafolding with Angular CLI   |5 min   |**COMPLETED**   |
|8   |client   |Create the folder architecture and basic configuration   |15 min   |INCOMPLETE   |
|9   |client   |Add ngx-bootstrap library and bootstrap customization   |30 min   |INCOMPLETE   |
|11   |client   |Create NotFoundPage Screen   |10 min   |INCOMPLETE   |
|12   |client   |Add authentication to Angular App   |1 hour   |INCOMPLETE   |
|13   |client   |Add user registration page   |30 min   |INCOMPLETE   |
|14   |client   |Create Player & Admin Side Screens   |2 hours   |INCOMPLETE   |
|15   |client   |Add admin side CRUD functionality for questions/users from API   |2 hours   |INCOMPLETE   |
|16   |client   |Add resuts and unanswered quizzes screens at player side   |15 min   |INCOMPLETE   |


## API Endpoints

If you want to see the API Enpoints in the planning feel free to review [this document](_notes/apiMap.md).

## Web application routing strategy

For the web application routing we are going to use a routing strategy for navigating throght the application, for more details please checkout [this document](_notes/clientRouting.md)

## Aditional notes about this project

For general notes there is a directory called `_nodes` which host assets files and some markdown files with some good information about how to create these tasks. See more in the [table of contents](_notes/README.md)

## License

This project is based on the MIT license

## Author
- Ruslan Gonzalez
- Twitter: [@ruslangonzalez](https://twitter.com/ruslangonzalez)
