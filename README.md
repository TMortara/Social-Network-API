# Social-Network-API

## Description


## Table of Contents
- [Installation Steps](#installation-steps)
- [Usage](#usage)
- [Built With](#built-with)
- [File Structure](#file-structure)
- [Credits](#credits)
- [Resources Used to Complete Project](#resources-used-to-complete-project)
- [License](#license)
- [Recording](#recording)

## Installation Steps
Before using this application you must [install Node.js](https://nodejs.org/en/).

After installing Node.js, open the integrated terminal in VS Code and run `npm install`.  This will install all of the dependencies listed in the package.json file. 

<u>Installation Resources</u>:
- [Install Express.js](https://expressjs.com/en/starter/installing.html)
- [Install Mongoose](https://www.npmjs.com/package/mongoose)

## Usage

### General Instructions
1. Before beginning make sure you have completed the [Installation Steps](#installation-steps)
2. Open integrated terminal in VS Code and type `node server.js` to begin the application
3. Open Insomnia
4. Add `http://localhost:3001/api` to the search bar
6. Based on the desired outcome:
    1.  Select the method `GET`, `POST`, `PUT`, or `DELETE`
    2.  Update the URL to included the desired route

### GET Routes
The Social Network API consists of 4 `GET` routes: 
1. GET all Users - `/users`
2. GET all Thoughts - `/thoughts`
3. GET single User - `/users/:userId`
4. GET single Thought - `/thoughts/:thoughtsId`

### POST Routes
The Social Network API consists of 4 `POST` routes:
1. POST new User - `/users`
    -   Sample JSON Body: `{ "username": "jojorabbit", "email": "jojo.rabbit@gmail.com" }`
    -   Email Validation: Users must have a valid email address before the user can be created.  Email addresses are validated using the `/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/` regular expression.    
2. POST new Thought - `/thoughts`
    -   Sample JSON Body: `{ "thoughtText": "Case Closed", "username": "jojorabbit", "userId": "640fd5f84494b938f5a1b1c0" }`
    -   Moment.js npm package is used to format the `createdAt` date
3. POST Reaction to a User Thought `/thought/:thoughtId/reactions`
    -   Sample JSON Body: `{ "reactionBody": "Is it thought?", "username": "captaink" }`
    -   Moment.js npm package is used to format the `createdAt` date
4. POST User to User's Friends Array `/users/:userId/friends/:friendsId`

### PUT Routes
The Social Network API consists of 2 `PUT` (update) routes:
1. PUT single User - `/users/:userId`
2. PUT single Thought - `/thoughts/:thoughtId`

### DELETE Routes
The Social Network API consists of 4 `DELETE` routes:
1. DELETE User and all User's Thoughts - `/users/:userId`
2. DELETE Thought and DELETE from User's Thoughts Array - `/thoughts/:thoughtId`
3. DELETE Reaction from User's Thought - `/thoughts/:thoughtId/reactions/:reactionId`
4. DELETE USER from Friends Array - `/users/:userId/friends/:friendsId`

## Built With

![Built With](https://skills.thijs.gg/icons?i=js,nodejs,mongodb&theme=dark)

### Other Technologies Used: 
- Express.js
- Mongoose
- Insomnia
- Moment.js

## File Structure

## Credits
- Torre and Jason for helping me work through issues with a couple of my routes.

## Resources Used to Complete Project
- Activity and Mini Project examples from Week 18 class respository
- [Mongoose Documentation: Models](https://mongoosejs.com/docs/models.html)
- [Mongoose Documentation: Subdocuments](https://mongoosejs.com/docs/subdocs.html)
- [Mongoose Documentation: Virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html)
- [Mongoose Documentation: SchemaTypes](https://mongoosejs.com/docs/schematypes.html)
- [Introduction to Mongoose for MongoDB](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)
- [Moment.js](https://momentjs.com/)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Recording

https://user-images.githubusercontent.com/107971753/226145071-8208c7ba-d5a7-4e4d-b2e6-b0943b713772.mp4






