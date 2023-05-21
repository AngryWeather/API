# Trivia API

Project in progress.
The api allows registration and login.

It also generates trivia based on "https://opentdb.com/api_config.php" api.


## Installation
* `npm install` to install dependencies
* `npm start` to start development server

## Technologies
* Express

## Usage
### /user route
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
