# API Endpoint MAP Planning

[Go back to table of contents](README.md)

In this document I will detail the API Rest Map before starting to code.

## Terms

* **Method:** REST API HTTP Verb: GET, POST, PUT, DELETE
* **Endpoint Path:** Router endpoint example `'/'` which will be `https://localhost:3000/`
* **Private:** If this path is private — when true — which requires the Authentication Berear Token or public — true — that does not requires the Authentication Berear Token.
* **Roles:** This is the level of RBAC, the available are "ADMIN", "PLAYER", or "any"
* **Detail:** Description of the endpoint
* **Current user:** Is the user signed (by its JWT Token)


## API Endpoints
|Method   |Endpoint Path   |Private   |Roles   |Detail  |
|---|---|---|---|---|
|POST   |/auth/login   |false   |false   |User sign in   |
|GET   |/auth/profile   |true   |any   |Get current user profile   |
|POST   |/user/registration   |false   |false   |User sign up, we need to provide in the body the new user credentials  |
|GET   |/user   |true   |ADMIN   |Get all users   |
|DELETE   |/user/`:userId`   |true   |ADMIN   |Delete one user   |
|POST   |/question   |true   |ADMIN   |Create a new question, we need to provide in the body the question with an array of answers.   |
|GET   |/question   |true   |ADMIN   |Get all questions   |
|POST   |/question/`:questionId`/answer   |true   |ADMIN   |Add answer to question   |
|PUT   |/question/`:questionId`   |true   |ADMIN   |Edit/Reemplace an existing question   |
|DELETE   |/question/`:questionId`   |true   |ADMIN   |Delete an existing question   |
|PUT   |/answer/`:answerId`   |true   |ADMIN   |Update an existing question   |
|DELETE   |/answer/`:answerId`   |true   |ADMIN   |Delete an existing question   |
|POST   |/quiz   |true   |PLAYER   |Submit a quiz answer for the current user, we need to provide in the body the answerId |
|GET   |/quiz/answered   |true   |PLAYER   |Get history for answered quizzes for the current user  |
|GET   |/quiz/unanswered   |true   |PLAYER   |Get history for unanswered quizzes for the current user  |
