# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Description of functionality

Provides an API for managing users and clothing items, letting users create accounts, add clothing items with weather tags, like/unlike items.

## Running the Project

`npm run start` — to launch the server

## Technologies and techniques used

Node.js, Express.js, MongoDB, Mongoose for schemas/models, ESLint with Airbnb config for code style, REST API design.

`npm run dev` — to launch the server with the hot reload feature

## Authentication

• POST /signup — creates a new user (requires name, avatar, email, password)
• POST /signin — logs in a user and returns a JWT token
• All other endpoints require an Authorization: Bearer <token> header

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/1-eC7w1oltSp6jC1xMYRUX6rz-XqwFN7h/view?usp=sharing), where I describe my
project and some challenges I faced while building it.
