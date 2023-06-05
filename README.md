# Trivia API

Project in progress.
The api allows registration and login.

It also generates trivia based on "https://opentdb.com/api_config.php" api.


## Installation
* `npm install` to install dependencies
* `npm start` to start development server

## Database
Table name: Users
Columns: id, username, email, password

## Technologies
* Express
* PostgreSQL

## Usage
### /user
#### /user/register

request:
  * username
  * email
  * password

#### /user/login

request:
  * email
  * password

response:
  * jwt token

### /trivia
#### /trivia/categories

response:
 * list of all categories fetched from https://opentdb.com/api_category.php

#### /trivia/data
**requires authorization**

request:
* numOfQuestions
* category (optional)
* difficulty (optional)
* type (optional)

Example request with required keys:
```
{
	"numOfQuestions": "4"
}
```

Example request with optional keys:
```
{
	"numOfQuestions": "4",
	"category": "General Knowledge",
	"difficulty": "hard",
	"type": "multiple"
}
```
