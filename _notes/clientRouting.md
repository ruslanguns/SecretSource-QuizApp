# Application routing strategy

[Go back to table of contents](README.md)

This file will have the routing strategy for the front-end web application.

|Path   |Route description   |Protected   |Role   |
|---|---|---|---|
|/   |Dashboard page  |YES   |PLAYER / ADMIN   |
|/login   |App login page   |NO   |Any   |
|/quizzes   |Show all quizzes page   |NO   |PLAYER   |
|/quizzes?filter=answered   |Show answered quizzes  |YES   |PLAYER   |
|/quizzes?filter=unanswered   |Show unanswered quizzes   |YES   |PLAYER   |
|/questions   |Show all questions page   |YES   |ADMIN   |
|/questions/`:id`   |Question DETAIL, CREATE & EDIT page   |YES   |ADMIN   |
|/questions/0   |IF ID URL param is equal to '0' then is create page   |YES   |ADMIN   |
|/users   |Show all users page   |YES   |ADMIN   |
|/users/`:id`   |Show user details   |YES   |ADMIN   |
