const express = require('express');
const fs = require('fs');

const router = express.Router();
const fileName = './server/data.json';

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (error, contents) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(contents));
    });
  });
}

function writeFile(users) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(users), (error) => {
      if (error) {
        reject(error);
      }
      resolve(users);
    });
  });
}

router.route('/')
  .get(async (req, res) => {
    try {
      const users = await readFile();
      res.json(users);
    } catch (error) {
      res.send(error);
    }
  })
  .post(async (req, res) => {
    try {
      const { id, firstname, surname } = req.body;
      const users = await readFile();
      const user = users.find(u => u.id === id);

      if (user) {
        user.firstname = firstname;
        user.surname = surname;
      } else {
        users.push({
          id: Date.now(),
          firstname,
          surname,
        });
      }
      await writeFile(users);
      res.json(users);
    } catch (error) {
      res.send(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.query;

      const users = await readFile();
      const userIdx = users.findIndex(user => user.id === parseInt(id, 10));
      if (userIdx > -1) {
        users.splice(userIdx, 1);
      }
      await writeFile(users);
      res.send('OK');
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;
