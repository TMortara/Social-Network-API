# Social-Network-API

## Description
The Social Network API was created to allow for the creation, update, and edit of user data.  This includes users thoughts and their reactions to other thoughts posted on the site.  Users can also interact with other users by adding friends. When Users are deleted, all their thoughts and other data will also be deleted. 

## Table of Contents
- [Installation Steps](#installation-steps)
- [Usage](#usage)
    -   [Available GET Routes](#available-get-routes)
    -   [Available POST Routes](#available-post-routes)
    -   [Available PUT Routes](#available-put-routes)
    -   [Available DELETE Routes](#available-delete-routes)
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

### Available GET Routes
The Social Network API consists of 4 `GET` routes: 
1. GET all Users - `/users`
2. GET all Thoughts - `/thoughts`
3. GET single User - `/users/:userId`
4. GET single Thought - `/thoughts/:thoughtsId`

### Available POST Routes
The Social Network API consists of 4 `POST` routes:
1. POST new User - `/users`
    -   Sample JSON Body: `{ "username": "jojorabbit", "email": "jojo.rabbit@gmail.com" }`
    -   Email Validation: Users must have a valid email address before the user can be created.  Email addresses are validated using the `/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/` regular expression.  You will receive a `500` error if the email address is not valid.    

        ![Screen Shot 2023-03-19 at 3 11 05 PM](https://user-images.githubusercontent.com/107971753/226206313-815225cc-0d8f-4d77-84be-3f98bcf13845.png)

2. POST new Thought - `/thoughts`
    -   When you create a new thought, the new thought can be found in the collection of all thoughts and in the thought array for each user.
    -   Sample JSON Body: `{ "thoughtText": "Case Closed", "username": "jojorabbit", "userId": "640fd5f84494b938f5a1b1c0" }`
    -   Moment.js npm package is used to format the `createdAt` date
3. POST Reaction to a User Thought - `/thought/:thoughtId/reactions`
    -   Sample JSON Body: `{ "reactionBody": "Is it thought?", "username": "captaink" }`
    -   Moment.js npm package is used to format the `createdAt` date
    -   When adding a new Reaction to a Thought, the Reaction will be added to the reactions array and the Reaction count will be increased by `1`.
    
        ![Screen Shot 2023-03-19 at 3 09 28 PM](https://user-images.githubusercontent.com/107971753/226206232-131631b2-f4f2-4e3e-8a8b-67e259af086d.png)
        
4. POST User to User's Friends Array - `/users/:userId/friends/:friendsId`
    -   When adding a new User to your friends array, your friends count will increase by `1` and the `userId` will be added to the friends array.

        ![Screen Shot 2023-03-19 at 3 04 55 PM](https://user-images.githubusercontent.com/107971753/226206002-e555559f-8f2d-4f3f-85a4-6c2647bffa7a.png)

### Available PUT Routes
The Social Network API consists of 2 `PUT` (update) routes:
1. PUT single User - `/users/:userId`
    -   Sample JSON Body: `{ "username": "jojo.rabbit", "email": "jojo.rabbit@gmail.com" }`
2. PUT single Thought - `/thoughts/:thoughtId`
    -   Sample JSON Body: `{ "thoughtText": "Case Closed Again", "username": "jojorabbit", "userId": "640fd5f84494b938f5a1b1c0" }`

### Available DELETE Routes
The Social Network API consists of 4 `DELETE` routes:
1. DELETE User and all User's Thoughts - `/users/:userId`
    -   If you delete a single User you will also delete the Thoughts created by the User.
    
        -   User with thought in thought array:
  
        ![Screen Shot 2023-03-19 at 3 14 14 PM](https://user-images.githubusercontent.com/107971753/226206456-6ea779f0-3615-4f75-986f-58d93bd6b75b.png)
        
        -   Delete user:
  
        ![Screen Shot 2023-03-19 at 3 17 30 PM](https://user-images.githubusercontent.com/107971753/226206601-f01f91ca-1674-46b1-91e0-13f339b655bb.png)
        
        -   Notice thought associated with User that was deleted cannot be found following deletion of user.

        ![Screen Shot 2023-03-19 at 3 16 50 PM](https://user-images.githubusercontent.com/107971753/226206568-c5f1bb1c-baba-49bb-b461-5ec2e42fd1c4.png)

2. DELETE Thought and DELETE from User's Thoughts Array - `/thoughts/:thoughtId`
    -   If you delete a single Thought, it will be removed from the Users thoughts array.
3. DELETE Reaction from User's Thought - `/thoughts/:thoughtId/reactions/:reactionId`
    -   When deleting a new friend from the users friends array, the friends array will be decreased by `1`.
4. DELETE USER from Friends Array - `/users/:userId/friends/:friendsId`
    -   When deleting a new friend from the users friends array, the friends array will be decreased by `1`.

## Built With

![Built With](https://skills.thijs.gg/icons?i=js,nodejs,mongodb&theme=dark)

### Other Technologies Used: 
- Express.js
- Mongoose
- Insomnia
- Moment.js

## File Structure
The directory for this application is as follows:
 - config/ - connection file for the database
 - controller/ - creates the controller for the api routes for Users and Thoughts
 - models/ - creates the models for Users and Thoughts and the Schema for the Reaction
 - routes/ - contains the routes
            
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






