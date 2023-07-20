const UNAUTHORIZED = 401;

const checkEmail = (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(UNAUTHORIZED).json({ message: 'Campo de email ausente!' });
  }
  next();
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(UNAUTHORIZED).json({ message: 'Campo de senha ausente!' });
  }

  next();
};

module.exports = {
  checkEmail,
  checkPassword,
};