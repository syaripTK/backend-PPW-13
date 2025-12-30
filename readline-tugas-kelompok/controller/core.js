const { createInterface } = require("readline");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (quest) => {
  return new Promise((resolve) => {
    rl.question(quest, (answer) => {
      resolve(answer);
    });
  });
};

module.exports = {
  rl,
  ask,
};
