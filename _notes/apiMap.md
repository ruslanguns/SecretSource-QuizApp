# API Endpoint MAP Planning

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
|POST   |/login   |false   |false   |User sign in   |
|POST   |/registration   |false   |false   |User sign up, we need to provide in the body the new user credentials  |
|GET   |/profile   |true   |any   |Get current user profile   |
|GET   |/questions   |true   |ADMIN   |Get all questions   |
|POST   |/questions   |true   |ADMIN   |Create a new question, we need to provide in the body the question with an array of answers.   |
|PUT   |/questions/`:questionId`   |true   |ADMIN   |Edit/Reemplace an existing question   |
|DELETE   |/questions/`:questionId`   |true   |ADMIN   |Delete an existing question   |
|POST   |/quiz   |true   |PLAYER   |Submit a quiz answer for the current user, we need to provide in the body questionId and answerId |
|GET   |/quiz/stats   |true   |PLAYER   |Get statistics (No. Correct and Incorrect answers and 5 last answered/unanswered quizzes) for the current user |
|GET   |/quiz/answered   |true   |PLAYER   |Get history for answered quizzes for the current user  |
|GET   |/quiz/unanswered   |true   |PLAYER   |Get history for unanswered quizzes for the current user  |
