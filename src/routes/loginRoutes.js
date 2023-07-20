const express = require('express');
const { generateToken } = require('../utils/helperFunctions');
const { checkEmail, checkPassword } = require('../middlewares/checkLogin');

const router = express.Router();

// const INTERNAL_SERVER_ERROR = 500;
const HTTP_OK_STATUS = 200;

// 3 - Endpoint POST /login que deve receber no corpo da requisição os campos email e password e retornar um token aleatório de 16 caracteres;
router.post('/', checkEmail, checkPassword, (req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;