"use strict";

const userHelper    = require("../lib/util/user-helper");

const express       = require('express');
const usersRoutes  = express.Router();

module.exports = function(DataHelpers) {

  usersRoutes.get("/", function(req, res) {
    DataHelpers.getUsers((err, users) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(users);
      }
    });
  });

  usersRoutes.post("/", function(req, res) {
    if (!req.body.useremail || !req.body.password || !req.body.userhandler) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    } res.redirect("/");
    
    const newUser = {
      useremail: req.body.useremail,
      password: req.body.password,
      handler: req.body.userhandler
    };

    DataHelpers.createUser(newUser, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return usersRoutes;

}
