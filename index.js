const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const usersRouter = require('./users/users-router.js');
const authRouter = require('./auth/auth-router');
const restricted = require('./auth/restricted-middleware.js');

const sessionConfig = {
  name: 'masterchief',
  secret: 'this is a secret . . .',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true
};

const server = express();
      server.use(express.json());
      server.use(helmet());
      server.use(session(sessionConfig));
      server.use('/api/users', restricted, usersRouter);
      server.use("/api/auth", authRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Welcome to the server!</h2>
  `)
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n ** SERVER LISTENING ON PORT: ${PORT} **`);
});
