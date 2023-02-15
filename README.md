# Mock Social Network API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
This app is a mock social network API's backend, using Express/Mongoose/MongoDB (NoSQL). There is a User model, and a Thought model (similar to a blog post). The Thought model has an embedded subdocument called 'reactions' which are effectively other users' responses to those thoughts. Users create thoughts, which are referred to in their model. Users can also be added as friends (User model self-reference) to other users. It is backend only, so performing actions must be done through an app like Insomnia or Postman.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Tests](#tests)
- [Comments/Flaws](#commentsflaws)
- [License](#license)

## Installation

Packages needed are just 'express' and 'mongoose', the latter which serves as a smooth way of connecting Express to MongoDB (the NoSQL database being used).

## Usage

Once the dependencies have been installed, all you have to do is run it with 'node index.js'. This should sync the MongoDB database (named socialDb in this case) and allow you to start testing out the endpoints. Both the Thought and User routes have full CRUD (including two reads: single and all). These two models are linked, and every thought is made by a user. When you 'GET' a user, their associated thoughts are populated. Also, if you delete a user, their associated thoughts will also be deleted. The 'reactions' subdoc (an array; a field of the Thought model) has a POST and DELETE route, and the 'friends' array (a field of User, referencing itself) also has POST and DELETE routes. Keep in mind, the routes are assuming that your request body (preferably done in JSON) is formatted correctly (if non-existent IDs are referenced, it will throw a 404 error). Here are the required fields to put in the req.body their respective routes:
  
User POST/UPDATE: `username` and `email`, and `userId` in req.params for UPDATE only  
User DELETE: No body, but `userId` in req.params  
Thought POST: `thoughtText`, `username` and `userId`  
Thought UPDATE: `thoughtText` in body, `thoughtId` in req.params  
Thought DELETE: No body, but `thoughtId` in req.params  
  
Reaction POST: `reactionBody` and `username`, with the `thoughtId` in req.params  
Reaction DELETE: No body, with `thoughtId` in params  
Friend actions: Both done in params, it should look like this: `/api/users/:userId/friends/:friendId`  
  

Screenshots (just the big GETs):  
![GET all users](./assets/mockups/getAllUsers.png?raw=true "GET all users, with populated arrays")  
![GET all thoughts](./assets/mockups/getAllThoughts.png?raw=true "GET all thoughts with reactions included")
  
Link to video: https://drive.google.com/file/d/1FhUu6AaAWHYUQGHAN-ukRrGOMdSpDKIb/view
  
  
## Credits

GitHub user 'andreasonny83' for a nice boilerplate '.gitignore' file, and as always, a few of our course exercises; great examples off of which to build!

## Tests

Because there is no front-end, use an API tool like Insomnia or Postman to test the endpoints, and make sure you're passing in only the necesary fields (many of the IDs are passed in thru the URL params and not in the req.body)

## Comments/Flaws

There isn't too much wrong with how this functions. However, there could have been a more expansive net to catch every possible type of error and handle it smoothly. I was kicking around the idea of doing a two-way friend add -- when one user adds a friend to their list, as it stands, the vice-versa 'add' doesn't take place -- while not necessary, it would be kind of cool to have done. 

## License

Covered under the MIT license.
