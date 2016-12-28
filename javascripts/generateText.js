import readTextFile from './readingTextFile';

const WORDS = readTextFile('../dictionary.txt');
const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min; // exclude upper max number

const generateText = () => {
  let words = "";
  for ( let i = 0; i < 20; i++){
    words += WORDS[(generateRandomNumber(0, WORDS.length))];
    words += " ";
  }
  return words;
}

export default generateText;
