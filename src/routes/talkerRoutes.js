const express = require('express');
const { readFile } = require('../utils/helperFunctions');
const { ckeckTalkers } = require('../middlewares/checkTalker');

const router = express.Router();

// 1 - Endpoint GET /talker que retorna um array com todas as pessoas palestrantes cadastradas.
router.get('/', async (_req, res) => {
  try {
    const talkers = await readFile();
    res.json(talkers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// 2 -
router.get('/:id', ckeckTalkers, async (req, res) => {
  try {
    const talkers = await readFile();
    const talker = talkers.find(({ id }) => id === Number(req.params.id));
    res.json(talker);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;