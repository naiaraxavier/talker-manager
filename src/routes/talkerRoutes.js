const express = require('express');
const { readFile, writeFile } = require('../utils/helperFunctions');
const { ckeckTalkers, checkFieldsTalker } = require('../middlewares/checkTalker');
const authentication = require('../middlewares/authentication');

const router = express.Router();

const INTERNAL_SERVER_ERROR = 500;
const CREATED = 201;

// 1 - Endpoint GET /talker que retorna um array com todas as pessoas palestrantes cadastradas.
router.get('/', async (_req, res) => {
  try {
    const talkers = await readFile();
    res.json(talkers);
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
    res.send({ message: err.message });
  }
});

module.exports = router;