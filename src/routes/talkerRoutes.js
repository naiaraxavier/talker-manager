const express = require('express');
const { readFile, writeFile } = require('../utils/helperFunctions');
const {
  ckeckTalkers,
  checkFieldsTalker,
  checkRateQueryParams,
} = require('../middlewares/checkTalker');
const authentication = require('../middlewares/authentication');

const router = express.Router();

const INTERNAL_SERVER_ERROR = 500;
const HTTP_OK_STATUS = 200;
const NO_CONTENT = 204;
const CREATED = 201;

// 8 - Endpoint GET /talker/search com parãmetro de consulta q=searchTerm
// 9 - Endpoint GET /talker/search com parãmetro de consulta rate=rateNumber
// Ordem de rotas: rotas específicas -> rotas genéricas
router.get('/search', authentication, checkRateQueryParams, async (req, res) => {
  try {
    const { q, rate } = req.query;
    let talkers = await readFile();
    if (q) talkers = talkers.filter(({ name }) => name.includes(q));
    if (rate) {
    talkers = talkers
      .filter(({ talk }) => talk.rate === Number(rate)); 
    }
    return res.json(talkers);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  }
});

// 2 - Endpoint GET /talker/:id que retorna a pessoa palestrante com base no id.
router.get('/:id', ckeckTalkers, async (req, res) => {
  try {
    const talkers = await readFile();
    const talker = talkers.find(({ id }) => id === Number(req.params.id));
    res.json(talker);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  }
});

// 1 - Endpoint GET /talker que retorna um array com todas as pessoas palestrantes cadastradas.
router.get('/', async (_req, res) => {
  try {
    const talkers = await readFile();
    res.json(talkers);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  }
});

// 5 - Endpoint POST /talker
router.post('/', authentication, checkFieldsTalker, async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    const talkers = await readFile();
    const newTalker = {
      name,
      age,
      id: talkers[talkers.length - 1].id + 1,
      talk: {
        watchedAt: talk.watchedAt,
        rate: talk.rate,
      },
    };
    const allTalkers = [...talkers, newTalker];
    await writeFile(allTalkers);
    res.status(CREATED).json(newTalker);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  }
});

// 6 - Endpoint PUT /talker/:id
router.put('/:id', authentication, ckeckTalkers, checkFieldsTalker, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await readFile();
    const index = talkers.findIndex((element) => element.id === Number(id));
    talkers[index] = { id: Number(id), name, age, talk };
    await writeFile(talkers);
    res.status(HTTP_OK_STATUS).json(talkers[index]);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  }
});

// 7 - Endpoint DELETE /talker/:id
router.delete('/:id', authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFile();
    const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));
    await writeFile(filteredTalkers);
    res.status(NO_CONTENT).end();
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  }
});

module.exports = router;