const { readFile } = require('../utils/helperFunctions');

const ckeckTalkers = async (req, res, next) => {
  const talkers = await readFile();
  if (!talkers.some(({ id }) => id === Number(req.params.id))) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

module.exports = {
  ckeckTalkers,
};