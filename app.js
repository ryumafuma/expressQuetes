require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const moviesHandlers = require("./moviesHandlers");

app.get("/api/movies", moviesHandlers.getMovies);
app.get("/api/movies/:id", moviesHandlers.getMoviesById);
//app.post("/api/movies", moviesHandlers.postMovies);
//app.put("/api/movies/:id", moviesHandlers.updateMovies);
app.delete("/api/movies/:id", moviesHandlers.deleteMovies);

const usersHandlers = require("./usersHandlers.js");

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
//app.post("/api/users", usersHandlers.postUsers);
//app.put("/api/users/:id", usersHandlers.putUsers);
app.delete("/api/users/:id", usersHandlers.deleteUsers);

const { validateMovies } = require("./validators.js");

app.post("/api/movies", validateMovies, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovies, moviesHandlers.updateMovies);

const { validateUsers } = require("./validators.js");

app.post("/api/users", validateUsers, usersHandlers.postUsers);
app.put("/api/users/:id", validateUsers, usersHandlers.putUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
