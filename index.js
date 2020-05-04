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
    const newName = req.body;

    userNames.push(newName);

    res.status(201).json(newName)
});

server.get('/api/users', function(req, res) {
    // return an array of lessons (id, name)

    res.json(userNames);
});


server.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    
    // find the user from array
    let user = userNames.filter(name => name.id === id);
    
    res.status(201).json(user);
});

server.delete('/api/users/:id', (req, res) => {
    // everything that comes from a url will be a string
    const id = Number(req.params.id);

    // find the lesson on the array and remove it
    userNames = userNames.filter(name => name.id !== id)
    
    res.status(200).json(userNames);
});

server.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    // updated name
    const updatedName = req.body.name
    // find user from array
    const user = userNames.filter(name => name.id === id);



    res.status(201).json( user )
});

server.listen(8000, () => console.log('\n== API is up ==\n'));
