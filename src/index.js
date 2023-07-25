const express = require('express');
const talkerRoutes = require('./routes/talkerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const connection = require('./db/connection');

const app = express();
app.use(express.json());

// para o express publicar a nossa rota:
app.use('/talker', talkerRoutes);
app.use('/login', loginRoutes);

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, async () => {
  console.log('Online');

    // O código abaixo é para testarmos a comunicação com o MySQL
    const [result] = await connection.execute('SELECT 1');
    if (result) {
      console.log('MySQL connection OK');
    }
});
