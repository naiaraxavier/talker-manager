const express = require('express');
const { readFile } = require('./utils/helperFunctions');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 1 - Endpoint GET /talker que retorna um array com todas as pessoas palestrantes cadastradas.
app.get('/talker', async (_req, res) => {
  try {
    const talkers = await readFile();
    res.json(talkers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
