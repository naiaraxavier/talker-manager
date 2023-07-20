const { readFile } = require('../utils/helperFunctions');

const NOT_FOUND = 404;

// 2 - Caso não seja encontrada uma pessoa palestrante com base no id da rota, a requisição retorna status 404 e uma mensagem de erro.
const ckeckTalkers = async (req, res, next) => {
  const talkers = await readFile();
  if (!talkers.some(({ id }) => id === Number(req.params.id))) {
    return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

module.exports = {
  ckeckTalkers,
};