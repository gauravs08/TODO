# Todo App

A ToDo Node app build with Express, MongoDB and Angular.
Node,Express provides the RESTful API.
Angular provides the frontend and accesses the API.
MongoDB stores todo collection.

## Requirements

- [Node and npm](http://nodejs.org)
- MongoDB: Make sure you have your own local or remote MongoDB database URI configured in `.env` file

## Installation

1. Clone the repository: `git clone git@github.com:gauravs08/TODO`
2. Install the application: `npm install`
3. To fix the project : `npm audit fix`
4. Place your own MongoDB URI in `.env`
5. Config Port in `.env`
6. Start the server: `node server.js`
7. View in browser at `http://localhost:8080` or from Port mention in .env

## Features with UI & with REST api
1. Add new Todo `http://localhost:8080/api/todos/`  *add a body
2. Get all Todo `http://localhost:8080/api/todos`   
3. Delete a Todo`http://localhost:8080/api/todos/:todo_id`  pass id to delete
4. Update a Todo to make it complete `http://localhost:8080/api/todos/:todo_id` pass id and body to update

## Json format
`{
        "text": "Task1",
        "completed": true,
        "_id": "5ced59816244ab47b0257cd4",
        "__v": 0
    }`

![Todo-APP](http://g.recordit.co/V3knMN7hJu.gif)
