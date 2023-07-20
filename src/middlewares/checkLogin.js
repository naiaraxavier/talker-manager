const { validateEmail } = require('../utils/helperFunctions');

const BAD_REQUEST = 400;
const MSG_REQUIRED_EMAIL = 'O campo "email" é obrigatório';
const MSG_INVALID_EMAIL_FORMAT = 'O "email" deve ter o formato "email@email.com"';
const MSG_REQUIRED_PASSWORD = 'O campo "password" é obrigatório';
const MSG_LENGTH_PASSWORD = 'O "password" deve ter pelo menos 6 caracteres';

// 4 - Validações para o endpoint /login:
// O campo email é obrigatório e deve ter um formato válido
const checkEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) res.status(BAD_REQUEST).json({ message: MSG_REQUIRED_EMAIL });
  if (!validateEmail(email)) res.status(BAD_REQUEST).json({ message: MSG_INVALID_EMAIL_FORMAT });
  
  next();
};

// O campo password é obrigatório e deve ter no mínimo 6 caracteres
const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) res.status(BAD_REQUEST).json({ message: MSG_REQUIRED_PASSWORD });
  if (password.length < 6) res.status(BAD_REQUEST).json({ message: MSG_LENGTH_PASSWORD });

  next();
};

module.exports = {
  checkEmail,
  checkPassword,
};