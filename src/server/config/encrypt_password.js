const bcrypt = require('bcrypt');

const saltRounds = 12;

function generateSalt() {
  const salt = bcrypt.genSaltSync(saltRounds);
  console.log(`Salt : ${salt}`);
  return salt.toString();
}

function checkPassword(password, hash) {
  console.log(`Check Password : ${bcrypt.compareSync(password, hash)}`);
  return bcrypt.compareSync(password, hash);
}

function generateHash(password) {
  const hash = bcrypt.hashSync(password, (generateSalt()).toString());
  console.log(`Hash : ${hash}`);

  return hash.toString();
}

module.exports = {
  generateSalt,
  checkPassword,
  generateHash
};
