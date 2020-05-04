// import express from 'express'; // ES2015 Modules
const express = require('express'); // CommonJS Modules
const shortid = require('shortid');
const server = express();

server.use(express.json()); // teaches express how to read JSON from the body

let userNames = [
    {
        id: shortid.generate(),
        name: 'Ruby',
        bio: 'cool gal'
    },
    {
        id: shortid.generate(),
        name: 'Max',
        bio: 'cool guy'
    },
    {
        id: shortid.generate(),
        name: 'Lola',
        bio: 'cool gal'
    },
    {
        id: shortid.generate(),
        name: 'Roxie',
        bio: 'cool gal'
    }
];

server.get('/', (req, res) => {
    res.json({ api: ' Up and running! '});
});

server.post('/api/users', function(req, res) {
    let newName = req.body;
    newName.id = shortid.generate();

    if (newName.name && newName.bio){

        userNames.push(newName);

        res.status(201).json(newName)

    } else {

        const errorMessage = { 
            errorMessage: "Please provide name and bio for the user." 
        }

        res.status(400).json(errorMessage)
    }

});

server.get('/api/users', function(req, res) {
    // return an array of lessons (id, name)
    res.json(userNames);
});


server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    
    // find the user from array
    let [ user ] = userNames.filter(name => name.id === id);

    if(user){

        res.status(201).json(user);

    } else {

        const errorMessage = { 
            message: "The user with the specified ID does not exist." 
        }

        res.status(404).json(errorMessage)
    }

});

server.delete('/api/users/:id', (req, res) => {
    // everything that comes from a url will be a string
    const id = req.params.id;

    const here = userNames.find(user => user.id == id)
    
    if (!here){

        const errorMessage = { 
            message: "The user with the specified ID does not exist." 
        }

        res.status(404).json(errorMessage)
    } else {

      // find the lesson on the array and remove it
      userNames = userNames.filter(name => name.id !== id)

      res.status(200).json(userNames);
    }
    
});

server.patch('/api/users/:id', (req, res) => {
    const id = req.params.id;
    // updated name
    const update = req.body
    // find user from array
    const user = userNames.find(name => name.id === id);
    console.log(user)
    Object.assign(user, update)
    console.log(user)
    res.status(201).json( user )
});

server.listen(8000, () => console.log('\n== API is up ==\n'));
