const auth_router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');

auth_router.post('/register', (req, res) => {
  const userInfo = req.body;
  const ROUNDS = process.env.HASHING_ROUNDS || 10;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

  userInfo.password = hash;

  Users.add(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ err: "Error registering user" });
    });
});

auth_router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if(user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username
        };
        res.status(200).json({ welcome: user.username });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error finding user to log in", err: err });
    });
});

auth_router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if(err) {
        res.stats(500).json({ err: "Error logging out" });
      } else {
        res.status(200).json({ message: "Successfully logged out" });
      }
    });
  } else {
    res.status(200).json({ message: "You were never here" });
  }
});

module.exports = auth_router;
