export function getRandomCharacter(min, max) {
  const limit = max - min + 1;
  return String.fromCharCode(Math.floor(Math.random() * limit) + min);
}

export function getSymbol() {
  const symbolChar = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'";
  return symbolChar[Math.floor(Math.random() * symbolChar.length)];
}
