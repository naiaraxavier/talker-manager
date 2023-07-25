const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');

const DATA_TALKER_PATH = path.resolve(__dirname, '../talker.json');

// Função de leitura do JSON com o módulo fs
const readFile = async () => {
  try {
    const results = await fs.readFile(DATA_TALKER_PATH);
    const data = JSON.parse(results);
    return data;
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    return err.message;
  }
};

// Função de escrita com o módulo fs
const writeFile = async (reqBody) => {
  try {
    const stringJson = JSON.stringify(reqBody);
    await fs.writeFile(DATA_TALKER_PATH, stringJson);
    console.log('Arquivo escrito com sucesso!');
  } catch (err) {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
    return err.message;
  }
};

// Função que gera um token aleatório de 16 caracteres
const generateToken = () => crypto.randomBytes(8).toString('hex');

// Função que valida se email está do formato esperado
const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  const isValid = regex.test(email);
  return isValid;
};

// Função que valida se a data está no formato esperado
const isValidDate = (date) => {
  const pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const isValid = pattern.test(date);
  return isValid;
};

// Função que atualiza rate(avaliação) dos talkers(palestrantes)
const updateRateTalkers = async (id, updateTalker) => {
  try {
    const oldTalkers = await readFile();
    const updatedTalkers = oldTalkers.map((talker) => {
      if (talker.id === Number(id)) {
        return { ...talker, talk: { ...talker.talk, rate: updateTalker.rate } };
      }
      return talker;
    });
    await writeFile(updatedTalkers);
    console.log(`Talker com ${id} foi atualizado`);
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
};

module.exports = {
  readFile,
  writeFile,
  generateToken,
  isValidEmail,
  isValidDate,
  updateRateTalkers,
};