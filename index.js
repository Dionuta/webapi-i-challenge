// implement your API here
const express = require("express");

const db = require("./data/db");

const server = express();
const { find, findById, remove, update, insert } = db;

//middleware
server.use(express.json());

server.get("/api/users", (req, res) => {
  find()
    .then(allUser => {
      res.json(allUser);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  findById(id)
    .then(User => {
      if (User) {
        res.json(User);
      } else {
        res.status(404).json("The user with the specified ID does not exist.");
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  remove(id)
    .then(deleteUser => {
      res.json(deleteUser);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json("Please provide name and bio for the user.");
  }

  insert({ name, bio })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(() => {
      res
        .status(500)
        .json("There was an error while saving the user to the database");
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json("Please provide name and bio for the user.");
  }

  update(id, { name, bio })
    .then(updateUser => {
      if (updateUser) {
        res.json(updateUser);
      } else {
        res.status(404).json("The user with the specified ID does not exist.")
      }
    })
    .catch(() => {
      res.status(500).json("The user information could not be modified.");
    });
});

server.listen(5000, () => {
  console.log("Server is listening");
});
