const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');

const DATA_TALKER_PATH = path.resolve(__dirname, '../talker.json');

// Função de leitura do JSON com o modulo fs
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

// Função que gera um token aleatório de 16 caracteres
const generateToken = () => crypto.randomBytes(8).toString('hex');

// Função que valida se email está do formato esperado
const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  const isValid = regex.test(email);
  return isValid;
};

module.exports = {
  readFile,
  generateToken,
  validateEmail,
};