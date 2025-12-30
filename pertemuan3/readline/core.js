const data = require("./readline.js");

const ask = (question) => {
  return new Promise((resolve) => {
    data.rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

module.exports = {
  ask,
};
