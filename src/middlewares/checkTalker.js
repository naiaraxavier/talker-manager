const { readFile, isValidDate } = require('../utils/helperFunctions');

const NOT_FOUND = 404;
const BAD_REQUEST = 400;

// 2 - Caso não seja encontrada uma pessoa palestrante com base no id da rota, a requisição retorna status 404 e uma mensagem de erro.
const ckeckTalkers = async (req, res, next) => {
  const talkers = await readFile();
  if (!talkers.some(({ id }) => id === Number(req.params.id))) {
    return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

// validação se o nome foi enviado corretamente
const checkName = (req, res, next) => {
  const { name } = req.body;
  if (!name) res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

// validação se a idade foi enviada corretamente
const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  if (!Number.isInteger(age) || age < 18) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  next();
};

// validação se o campo talk foi enviado
const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) res.status(BAD_REQUEST).json({ message: 'O campo "talk" é obrigatório' });
  next();
};

// validação se data foi enviada no formato correto
const checkWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  if (!watchedAt) res.status(BAD_REQUEST).json({ message: 'O campo "watchedAt" é obrigatório' });
  if (!isValidDate(watchedAt)) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

// validação se avaliação foi enviada corretamente
const checkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  const validateRate = rate >= 1 && rate <= 5;
  if (rate === undefined) res.status(BAD_REQUEST).json({ message: 'O campo "rate" é obrigatório' });
  if (!Number.isInteger(rate) || !validateRate) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

// Validação do QueryParams rate
const checkRateQueryParams = (req, res, next) => {
  const { rate } = req.query;
  if (rate) {
    const numberRate = Number(rate);
    const validateRate = numberRate >= 1 && numberRate <= 5;
    if (!Number.isInteger(numberRate) || !validateRate) {
      return res.status(BAD_REQUEST).json({
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
    }
  }
  next();
};

const checkFieldsTalker = [
  checkName,
  checkAge,
  checkTalk,
  checkWatchedAt,
  checkRate,
];

module.exports = {
  ckeckTalkers,
  checkFieldsTalker,
  checkRateQueryParams,
};