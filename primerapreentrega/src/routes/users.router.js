const express = require ('express');
const { v4 : uuidv4 } = require('uuid');

const router = express.Router();

router.get('/users', (req, res) => {
    res.status(200).json(users);
})

module.exports = router;